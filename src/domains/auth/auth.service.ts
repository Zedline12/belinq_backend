import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Configration } from 'src/config/configration.interface';
import { LogEmptyOrNullProperty } from 'src/utils/helpers.utils';
import { UserService } from '../user/user.service';
import * as uuid from 'uuid';
import { RegisterDto } from './dto/auth.dto';
import { UserDocument } from '../user/entites/user.entity';
import { TokensResponse } from './auth.interface';
import { INVALLID_STOLEN_TOKEN } from 'src/errors/erros.constant';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { UsersSubscriptionsService } from '../users-subscriptions/users-subscriptions.service';
@Injectable()
export class AuthService {
  private config: Configration['auth'];
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly userSubscriptionService:UsersSubscriptionsService
  ) {
    const config = this.configService.get<Configration['auth']>('auth');
    LogEmptyOrNullProperty(config, this.logger);
    this.config = config;
  }
  public async login(userDoc: UserDocument): Promise<TokensResponse> {
    const accessToken = await this.generateAccessToken(userDoc._id.toString());
    const refreshToken = await this.generateRefreshToken(userDoc._id.toString());
    userDoc.saveRefreshToken(refreshToken);
    return { accessToken, refreshToken };
  }
  public async register(registerDto: RegisterDto): Promise<TokensResponse> {
   
    try {
      const signedUser = await this.userService.create(
        registerDto.firstName,
        registerDto.lastName,
        registerDto.email,
        registerDto.password,
        registerDto.phoneNumber,
        registerDto.workEmail,
        registerDto.profilePicture,
      );
      await this.userSubscriptionService.createSubscription(signedUser._id)
      const accessToken = await this.generateAccessToken(
        signedUser._id.toString(),
      );
      const refreshToken = await this.generateRefreshToken(signedUser._id.toString());
      signedUser.saveRefreshToken(refreshToken);
      return { accessToken, refreshToken };

    } catch (error) {
      throw error;
    } finally {
     
    }
  }
  public async validateRefreshToken(user:UserDocument,refreshToken: string):Promise<void> {
      if(user.activeRefreshToken!=refreshToken) throw new UnauthorizedException(INVALLID_STOLEN_TOKEN)
    return;
  }
  public async refresh(user:UserDocument,refreshToken: string): Promise<TokensResponse> {
    const newAccessToken = await this.generateAccessToken(user._id.toString());
    const newRefreshToken = await this.generateRefreshToken(user._id.toString());
    await user.saveRefreshToken(newRefreshToken);
    return { accessToken:newAccessToken, refreshToken: newRefreshToken };
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
  } // Optional, can help with parsing the JWT structure

// Function to validate JWT based on algorithm in the header (A)
validateJWT(token, secretOrPublicKey) {
  // Split the JWT into header, payload, and signature
  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');

  // Decode the header and payload
  const header = JSON.parse(decodeBase64Url(encodedHeader));
  const payload = decodeBase64Url(encodedPayload);
  
  // Verify the algorithm in the header
  const algorithm = header.alg;

  // Recreate the signature base string (A + B)
  const data = `${encodedHeader}.${encodedPayload}`;

  // Create a HMAC or RSA-based signature depending on the algorithm
  let computedSignature;

  if (algorithm === 'HS256') {
    // Using HMAC with SHA256 (symmetric key)
    computedSignature = crypto.createHmac('sha256', secretOrPublicKey).update(data).digest('base64url');
  } else if (algorithm === 'RS256') {
    // Using RSA with SHA256 (asymmetric key)
    const verifier = crypto.createVerify('sha256');
    verifier.update(data);
    computedSignature = verifier.verify(secretOrPublicKey, 'base64url');
  } else {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  // Compare the computed signature with the provided one (C)
  if (computedSignature === encodedSignature) {
    console.log('JWT is valid');
    return true;
  } else {
    console.log('JWT is invalid');
    return false;
  }
}

  public async generateAccessToken(id: string) {
    return await this.jwt.signAsync(
      { sub: id },
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
function decodeBase64Url(encodedHeader: any): string {
  throw new Error('Function not implemented.');
}

