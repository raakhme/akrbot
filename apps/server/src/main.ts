/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generatePaths } from '@akrbot/openapi';
import { AppModule } from './app/app.module';

import envConfig from './config/env';

async function bootstrap() {
  const globalPrefix = envConfig.app.root;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('VR API')
    .setDescription('Vocal Roads application API docs')
    .setVersion(envConfig.swagger.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(envConfig.swagger.root, app, document);
  const port = envConfig.app.port;
  await app.listen(port).then(async () => {
    Logger.log('Generate swagger types...');
    console.log(envConfig.swagger.url);
    await generatePaths({
      swaggerAddress: envConfig.swagger.urlJson,
    });
    Logger.log('Open API typescript definitions successfully generated!');
  });

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
