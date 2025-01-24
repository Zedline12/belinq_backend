import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Configration } from 'src/config/configration.interface';
import { LogEmptyOrNullProperty } from 'src/utils/helpers.utils';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { RegisterDto } from './dto/auth.dto';
import { UserDocument } from '../user/entites/user.entity';
import { LoginResponse, ResgisterResponse } from './auth.interface';
@Injectable()
export class AuthService {
  private config: Configration['auth'];
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {
    const config = this.configService.get<Configration['auth']>('auth');
    LogEmptyOrNullProperty(config, this.logger);
    this.config = config;
  }
  public async login(userDoc:UserDocument):Promise<LoginResponse> {
    const accessToken = await this.generateAccessToken(
      userDoc._id,
      userDoc.email,
      userDoc.roles,
    );
    const refreshToken = await this.generateRefreshToken(userDoc._id);
    userDoc.saveRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }
  public async register(registerDto: RegisterDto): Promise<ResgisterResponse> {
   
    const signedUser = await this.userService.create(
      registerDto.name,
      registerDto.email,
      registerDto.password,
      registerDto.phoneNumber,
      registerDto.companyName,
      registerDto.workEmail,
      registerDto.jobTitle,
      registerDto.companyWebsite,
      registerDto.companyLogo,
      registerDto.profilePicture,
    );
    const accessToken = await this.generateAccessToken(
      signedUser._id,
      signedUser.email,
      signedUser.roles,
    );
    const refreshToken = await this.generateRefreshToken(signedUser._id);
    signedUser.saveRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findUser({ email });
    if (user && (await user.passwordCheck(password))) {
      return user;
    }
    return null;
  }
  async getGoogleAccessToken(authorizationCode: string): Promise<void> {
    const body = {
      code: authorizationCode,
      client_id: this.config.oauth.clientId,
      client_secret: this.config.oauth.clientSecret,
      redirect_uri: this.config.oauth.redirectUri,
      grant_type: 'authorization_code',
    };
    await axios.post(this.config.oauth.tokenUri, body);
  }
  public async generateAccessToken(id: string, email: string, roles: string[]) {
    return await this.jwt.signAsync(
      { sub: id, email, roles },
      { secret: this.config.accessTokenSecret, expiresIn: 1300 },
    );
  }
  public async generateRefreshToken(id: string) {
    return await this.jwt.signAsync(
      { sub: id, uuid: uuid.v4() },
      { secret: this.config.refreshTokenSecret, expiresIn: '30d' },
    );
  }
}
