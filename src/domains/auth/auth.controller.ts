import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { GetOauthToken, LoginDto, RegisterDto } from './dto/auth.dto';
import { BasicApiDecorators } from 'src/decorators/swagger.decorators';
import { TokensResponse } from './auth.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { GetUser } from './decorators/get-user.decorator';
import { UserDocument } from '../user/entites/user.entity';
import { JwtRefreshAuthGuard } from './guards/refresh-token.guard';
import { GetToken } from './decorators/get-token.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @BasicApiDecorators({
    responseCode: 200,
    isArray: false,
    operation: {
      summary: 'Login existing user and returns new access and refresh tokens',
    },
    response: TokensResponse,
    description: 'login up a new user',
  })
  @ApiBody({
    type: LoginDto,
  })
  @UseGuards(LocalAuthGuard)
  async login(@GetUser() user: UserDocument): Promise<TokensResponse> {
    return await this.authService.login(user);
  }
  @Post('signup')
  @BasicApiDecorators({
    responseCode: 200,
    isArray: false,
    operation: { summary: 'Signs up a new user' },
    response: TokensResponse,
    description: 'Signs up a new user',
  })
  @ApiBody({ type: RegisterDto })
  async signup(@Body() registerDto: RegisterDto): Promise<TokensResponse> {
    return await this.authService.register(registerDto);
  }
  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @BasicApiDecorators({
    responseCode: 200,
    isArray: false,
    operation: {
      summary:
        'Replace expired accessToken with a new refresh and acccess Token',
    },
    response: TokensResponse,
    description: 'Replace expired refresh token',
  })
  @ApiHeader({
    name: 'refresh-token', // The name of the header
    description: 'The refresh token used to obtain a new access token', // Description for developers
    required: true, // Indicate that this header is mandatory
  })
  async refresh(@GetUser() user: UserDocument, @GetToken() refreshToken): Promise<TokensResponse> {
    return await this.authService.refresh(user,refreshToken)
  }

  @Get('oauth_callback')
  async getGoogleAccessToken(@Query('code') code) {
    return code;
  }
  @Post('oauth/token')
  async getOauthToken(@Body() getOauthToken: GetOauthToken) {
    return getOauthToken.authorizationCode;
  }
}
