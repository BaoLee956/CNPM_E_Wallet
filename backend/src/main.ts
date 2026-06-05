import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Cho phép CORS để frontend có thể gọi API

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
  })); // Sử dụng ValidationPipe toàn cục

  app.useGlobalFilters(new HttpExceptionFilter()); // Sử dụng ExceptionFilter toàn cục

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`E-Wallet backend is set up and listening on port ${port}.`);
}

bootstrap();

