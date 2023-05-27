import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // Whenever Nest encounters any validation decoratore like @IsNotEmpty() this will kick in

  await app.listen(3000);
}
bootstrap();
