/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { generatePaths } from './app/generatePaths';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const docsPrefix = 'docs';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .setVersion(config.swagger.version)
    .addTag('config')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(docsPrefix, app, swaggerDocument);

  await app.listen(port);

  const swaggerAddress = `http://localhost:${port}/${docsPrefix}`;

  await generatePaths({ swaggerAddress: swaggerAddress + '-json' });

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`📖 Application docs is running on: ${swaggerAddress}`);
}

bootstrap();
