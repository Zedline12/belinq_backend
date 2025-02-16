import { Module } from '@nestjs/common';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscription, userSubscriptionSchema } from './entities/users-subscription.entity';
import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { UserSubscriptionGuard } from './guards/user-subscription.guard';

@Module({
  imports:[MongooseModule.forFeature([{name:UserSubscription.name,schema:userSubscriptionSchema}]),SubscriptionPlansModule],
  providers: [UsersSubscriptionsService,UserSubscriptionGuard],
  exports:[UsersSubscriptionsService,UserSubscriptionGuard]
})
export class UsersSubscriptionsModule {}
