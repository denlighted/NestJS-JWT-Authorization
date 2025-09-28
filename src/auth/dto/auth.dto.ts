import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse{
  @ApiProperty({
    description: "JWT access token",
    example: "ewwewfewtgrwyhy3jt",
  })
  accessToken :string
}