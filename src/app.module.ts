import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { TaskModule } from './task/task.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [FeedbackModule, TaskModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
