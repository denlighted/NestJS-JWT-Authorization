import type { INestApplication } from '@nestjs/common';
import {  SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from '../config/swagger.config';

export function setupSwagger(app:INestApplication) {
  const config  = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app,config,{
    // deepScanRoutes:true
    // extraModels:
    operationIdFactory:(controllerKey,methodKey)=>`${controllerKey}-${methodKey}`,
  })

  SwaggerModule.setup('/docs',app,document,{
    jsonDocumentUrl:"/swagger.json",
    yamlDocumentUrl:"/swagger.yaml",
  })
}