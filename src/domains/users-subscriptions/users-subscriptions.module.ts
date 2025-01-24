import { Module } from '@nestjs/common';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UsersSubscriptionsController } from './users-subscriptions.controller';

@Module({
  controllers: [UsersSubscriptionsController],
  providers: [UsersSubscriptionsService],
})
export class UsersSubscriptionsModule {}
