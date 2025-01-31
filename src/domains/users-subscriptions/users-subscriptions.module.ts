import { Module } from '@nestjs/common';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UsersSubscriptionsController } from './users-subscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSubscriptionSchema } from './entities/users-subscription.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'UserSubscription',schema:userSubscriptionSchema}])],
  controllers: [UsersSubscriptionsController],
  providers: [UsersSubscriptionsService],
})
export class UsersSubscriptionsModule {}
