import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { TaskModule } from './task/task.module';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { RegistryModule } from './registry/registry.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' }, // token 有效期
    }),
    ConfigModule.forRoot(),
    FeedbackModule,
    TaskModule,
    LoginModule,
    RegistryModule,
    UsersModule,
    QrcodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // 全局 Guard
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
