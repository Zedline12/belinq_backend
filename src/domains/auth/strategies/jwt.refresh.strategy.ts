import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Configration } from 'src/config/configration.interface';
export const JWT_KEY = 'key';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy) {
    constructor( configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:configService.get<string>('auth.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
