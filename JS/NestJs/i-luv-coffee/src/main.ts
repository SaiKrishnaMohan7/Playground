import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes are applied to every request, acts at the global level
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any properties that are not the part of a DTO for a request
      forbidNonWhitelisted: true, // Throws an error if there are any properties that are not part of a DTO
      // Automatically transforms incoming data to the DTO type;
      // This setting transforms the plain JS object to a class instance;
      // This will also try and coerce the data to the correct type expected by the request handler;
      // Say, the id is expected to be a number, but it comes in as a string, it will be coerced to a number
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
