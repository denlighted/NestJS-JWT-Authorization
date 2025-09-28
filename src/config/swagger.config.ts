import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig(){
  return new DocumentBuilder()
    .setTitle("Awesome API")
    .setVersion("1.0.0")
    .setDescription("A simple and powerful REST API ")
    .build()
}