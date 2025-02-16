import { SetMetadata } from '@nestjs/common';
import { SubscriptionPlanType } from 'src/domains/subscription-plans/entities/subscription-plan.entity';

export const USER_SUBSCRIPTION_KEY = 'user_subscription';
export const RequiredSubscription = (userSubscription: SubscriptionPlanType) =>
  SetMetadata(USER_SUBSCRIPTION_KEY, userSubscription);
