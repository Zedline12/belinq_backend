import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SubscriptionPlanType } from 'src/domains/subscription-plans/entities/subscription-plan.entity';
import { USER_SUBSCRIPTION_KEY } from '../decorators/user-subscription.decorator';
import { UsersSubscriptionsService } from '../users-subscriptions.service';

@Injectable()
export class UserSubscriptionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userSubscriptionService:UsersSubscriptionsService,
  ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredUserSubscription = this.reflector.getAllAndOverride<SubscriptionPlanType>(
      USER_SUBSCRIPTION_KEY,
      [context.getHandler(), context.getClass()],
    );
      if(!requiredUserSubscription) return true
    const { user } = context.switchToHttp().getRequest();
      
    return await this.userSubscriptionService.checkUserSubscription(user._id,requiredUserSubscription as SubscriptionPlanType)
  }
}
