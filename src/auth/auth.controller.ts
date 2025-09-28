import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type{ Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorators';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from '@prisma/client';

@ApiTags("AuthService")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Account creation',
    description: 'Account creation request',
  })
  @ApiOkResponse({ type:AuthResponse })
  @ApiBadRequestResponse({description:"User does not exist"})
  @ApiConflictResponse({description:"User has already exist"})
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({passthrough:true})res:Response ,@Body() dto:RegisterRequest){
    return await this.authService.register(res,dto);
  }



  @ApiOperation({
    summary: 'Login',
    description: 'Login request',
  })
  @ApiOkResponse({ type:AuthResponse })
  @ApiBadRequestResponse({description:"User does not exist"})
  @ApiNotFoundResponse({description:"User not found"})
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Res({passthrough:true})res:Response,@Body() dto:LoginRequest){
    return await this.authService.login(res,dto);
  }


  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Refresh Token EndPoint',
  })
  @Post("refresh")
  @ApiOkResponse({ type:AuthResponse })
  @ApiUnauthorizedResponse({description:"Invalid refresh-token"})
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req:Request,@Res({passthrough:true})res:Response){
    return await this.authService.refresh(req,res);
  }


  @ApiOperation({
    summary: 'Logout from the system',
  })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Res({passthrough:true})res:Response){
    return await this.authService.logout(res);
  }

 @UseGuards(AuthGuard('jwt'))
  //@Authorization()
  @Get("@me")
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id:string,){
    return { id };

  }
}

