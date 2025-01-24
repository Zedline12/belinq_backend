import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { GetOauthToken, LoginDto, RegisterDto } from './dto/auth.dto';
import { BasicApiDecorators } from 'src/decorators/swagger.decorators';
import { LoginResponse, ResgisterResponse } from './auth.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/getUser.decorator';
import { UserDocument } from '../user/entites/user.entity';
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
    response: LoginResponse,
    description: 'login up a new user',
  })
  @ApiBody({
    type:LoginDto
  })
  @UseGuards(AuthGuard('local'))
  async login(@GetUser() user: UserDocument): Promise<LoginResponse> {
    return await this.authService.login(user);
  }
  @Post('signup')
  @BasicApiDecorators({
    responseCode: 200,
    isArray: false,
    operation: { summary: 'Signs up a new user' },
    response: ResgisterResponse,
    description: 'Signs up a new user',
  })
  @ApiBody({ type: RegisterDto })
  async signup(@Body() registerDto: RegisterDto): Promise<ResgisterResponse> {
    return await this.authService.register(registerDto);
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
