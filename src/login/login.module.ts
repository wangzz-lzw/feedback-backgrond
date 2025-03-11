import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersService } from '../users/users.service';
@Module({
  controllers: [LoginController],
  providers: [LoginService, UsersService, JwtService],
})
export class LoginModule {}
