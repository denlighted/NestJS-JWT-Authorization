import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

import {AppService} from "./app.service";

import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser())

  setupSwagger(app);

  //app.setGlobalPrefix('api');



  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
