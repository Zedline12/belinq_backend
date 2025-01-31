import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Configration } from 'src/config/configration.interface';
import { UserService } from 'src/domains/user/user.service';
import { USER_NOT_FOUND } from 'src/errors/erros.constant';
import mongoose from 'mongoose';
import { AuthService } from '../auth.service';
export const JWT_KEY = 'key';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userService.findUserById(
      new mongoose.Types.ObjectId(payload.sub),
    );
    if (!user) throw new NotFoundException(USER_NOT_FOUND);
    const token = req.headers['authorization']?.split(' ')[1];
   
    await this.authService.validateRefreshToken(user, token);

    return user;
  }
}
