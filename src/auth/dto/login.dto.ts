import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest{
  @ApiProperty({description: "User's email",
    example: "sabakaaaskol@gmail.com",
  })
  @IsString({message:"Email should be String"})
  @IsNotEmpty({message:"Email should not be empty"})
  @IsEmail({},{message:"Not correct format for Email"})
  email:string

  @ApiProperty({description: "User's password",
    example: "123456",
    minLength:6,
    maxLength:128})
  @IsString({message:"Password should be String"})
  @IsNotEmpty({message:"Password should not  be empty"})
  @MinLength(6,{message:"Password should be bigger than 6 characters"})
  @MaxLength(128,{message:"Password should be less than 128 characters"})
  password:string

}