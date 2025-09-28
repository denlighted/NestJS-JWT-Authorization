import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequest } from './dto/login.dto';
import { verify } from 'argon2';
import type { Response, Request } from 'express';
import { isDev } from '../utils/is-dev.utils';


@Injectable()
export class AuthService {

  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;

  constructor(private readonly prismaService: PrismaService,
              private readonly configService: ConfigService,
              private readonly jwtService: JwtService) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = configService.getOrThrow('COOKIE_DOMAIN');
  }


  async register(res:Response,dto: RegisterRequest) {
    const { name, email, password } = dto;

    const existUser = await this.prismaService.user.findUnique({ where: { email } });

    if (existUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.prismaService.user.create({
      data: {
        name, email,
        password: await hash(password),
      },
    });

    return this.auth(res,user.id);
  }

  async login(res:Response,dto: LoginRequest) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('User has not found');
    }

    return this.auth(res,user.id)
  }

  async refresh(req:Request,res:Response){
    const refreshToken = req.cookies['refresh_token'];
    console.log(refreshToken);

    if(!refreshToken){
      throw new UnauthorizedException('Not valid refreshToken');
    }
    const payLoad :JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if(payLoad){
      const user = await this.prismaService.user.findUnique({
        where: { id:payLoad.id },
        select:{
          id:true
        }});

      if(!user){
        throw new NotFoundException("Пользователь не найден");
      }

      return this.auth(res,user.id);
    }
  }

  async validate(id:string){
    const user = this.prismaService.user.findUnique({where:{id}});
    if(!user){
      throw new NotFoundException("User has not found");
    }

    return user;
  }

  private auth(res:Response, id:string){
    const {accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(res,refreshToken, new Date(Date.now() + 7*24*60*60*1000));

    return {accessToken};
  }

  async logout(res:Response){
    this.setCookie(res,'refresh_token',new Date(0))
    return true;
  }
  private generateTokens(id: string) {
    const payLoad: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payLoad, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payLoad, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refresh_token', value, {
      httpOnly: true,
      expires,
      secure:!isDev(this.configService),
      sameSite:isDev(this.configService)?'lax':'none',
    });
  }
}
