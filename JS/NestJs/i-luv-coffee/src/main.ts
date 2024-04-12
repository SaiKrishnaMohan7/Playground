import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response/wrap-response-interceptor.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';

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

  await app.listen(3000);
}
bootstrap();
