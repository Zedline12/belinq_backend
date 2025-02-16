import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {  JwtAccessTokenStrategy } from './strategies/jwt.access.strategy';
import { UserModule } from '../user/user.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local.guard';
import { TeamsModule } from '../teams/teams.module';
import { TeamRolesGuard } from './guards/team-roles.guard';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtAccessTokenStrategy,JwtRefreshTokenStrategy,LocalStrategy,LocalAuthGuard,TeamRolesGuard],
  imports: [
    PassportModule,
    TeamsModule,
    UsersSubscriptionsModule,
    forwardRef(() => UserModule),
    ConfigModule,
    JwtModule.register({}),
  ],
  exports: [AuthService],
})
export class AuthModule {}
