import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnectDataBase } from './db';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5000', // 允许的域名（或数组）
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
    credentials: true, // 允许携带 Cookie
  });
  const database = await createConnectDataBase();

  console.log(database, 'database');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
