
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { INVALID_CREDINTALS } from 'src/errors/erros.constant';
import { Strategy } from 'passport-local';
import { UserService } from 'src/domains/user/user.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
      super();
  }

    async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.getValidateUserByBasicAuth(username, password);
    if (!user) {
      throw new UnauthorizedException(INVALID_CREDINTALS);
    }
    return user;
  }
}