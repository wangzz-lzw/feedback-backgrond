import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 Header 提取 Token
      ignoreExpiration: false, // 不忽略过期
      secret: `${process.env.JWT_SECRET}`, // 与 JwtModule 中的一致
    });
  }

  // 验证通过后返回用户信息（会自动挂载到 Request 对象）
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
