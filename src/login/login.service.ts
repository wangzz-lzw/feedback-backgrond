import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // 新增导入
import { UsersService } from '../users/users.service';
import Result from 'src/interceptor/result.interceptor';

@Injectable()
export class LoginService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService, // 注入 JWT 服务
  ) {}

  async login(body: any) {
    const { username } = body;
    const user = await this.userService.findOneByName(username);

    if (user && user.password === body.password) {
      const payload = {
        username: user.username,
        sub: user.id, // 使用标准 sub 字段存储用户 ID
      };
      const userInfo = await this.userService.findOne(user.id);
      return Result.success({
        access_token: this.jwtService.sign(payload, {
          secret: `${process.env.JWT_SECRET}`,
        }), // 生成 JWT
        userInfo,
      });
    }
    return Result.fail('用户名或密码错误');
  }
}
