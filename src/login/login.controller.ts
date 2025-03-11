import { Controller, Body, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { Public } from '../decorators/public.decorator';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  @Public()
  async login(@Body() body: any) {
    return this.loginService.login(body);
  }
}
