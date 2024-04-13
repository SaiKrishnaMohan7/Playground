import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response/wrap-response-interceptor.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes are applied to every request, acts at the global level
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Will convert any query parma to the right type; Only applies to primitive types
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Coffee API')
    .setDescription('API for learning NestJS')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); // http://localhost:3000/api-docs

  await app.listen(3000);
}
bootstrap();
