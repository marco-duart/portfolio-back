import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfólio')
    .setDescription('This is an API created by me for my portfólio')
    .setVersion('1.0')
    .addServer('/v1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('v1/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: '*',
  });

  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
