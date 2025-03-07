import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Result from 'src/interceptor/result.interceptor';
@Injectable()
export class LoginService {
  constructor(private userService: UsersService) {}
  async login(body: any) {
    const { username } = body;
    const user = await this.userService.findOneByName(username);
    if (user && user.password === body.password) {
      return Result.success({});
    }
    return Result.fail('用户名或密码错误');
  }
}
