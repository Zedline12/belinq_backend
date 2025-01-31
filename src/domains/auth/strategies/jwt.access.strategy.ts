import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/domains/user/user.service';
import { USER_NOT_FOUND } from 'src/errors/erros.constant';
import mongoose from 'mongoose';
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.accessTokenSecret'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserById(
      new mongoose.Types.ObjectId(payload.sub),
    );
    if (!user) throw new NotFoundException(USER_NOT_FOUND);
    return user;
  }
}
