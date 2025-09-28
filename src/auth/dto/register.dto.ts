import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {

  @ApiProperty({
    description: "User's name",
    example: "John Doe",
    maxLength: 50,
  })

  @IsString({message:"Name should be String"})
  @IsNotEmpty({message:"Name should not be empty"})
  @MaxLength(50,{message:"Name should less than 50 characters"})
  name:string

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