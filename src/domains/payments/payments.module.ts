import { Module } from '@nestjs/common';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';
import { PaymentService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [],
  providers: [PaymentService],
  imports: [ConfigModule],
  exports: [PaymentService],
})
export class AuthModule {}
