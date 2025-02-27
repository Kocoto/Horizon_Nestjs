import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Horizon API')
    .setDescription('The Horizon API documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
