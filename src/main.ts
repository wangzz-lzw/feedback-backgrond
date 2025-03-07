import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnectDataBase } from './db';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5000', // 允许的域名（或数组）
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
    credentials: true, // 允许携带 Cookie
  });
  const database = await createConnectDataBase();
  const config = new DocumentBuilder()
    .setTitle('名称')
    .setDescription(
      '描述：<a href="http://localhost:3000/api-json">默认 json 链接</a>',
    )
    .setVersion('1.0.1')
    .setOpenAPIVersion('3.1.0')
    // 添加标签
    .addTag('users')
    .addTag('app')
    // 添加授权
    .addBearerAuth()
    .build();
  // 创建文档
  const document = SwaggerModule.createDocument(app, config);
  // 设置文档路径 为 api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
