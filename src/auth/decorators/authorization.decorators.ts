import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/auth.guards';

export function Authorization(){
  return applyDecorators(UseGuards(JwtGuard));
}