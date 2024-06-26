import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './task/task.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe()); // Whenever Nest encounters any validation decoratore like @IsNotEmpty() this will kick in
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(config.get('APP_PORT'));

  logger.log(`Application server listening at port 3000`);
}
bootstrap();
