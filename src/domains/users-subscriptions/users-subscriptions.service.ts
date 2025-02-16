import { Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  SubscriptionType,
  UserSubscription,
} from './entities/users-subscription.entity';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';
import { SubscriptionPlan, SubscriptionPlanDocument, SubscriptionPlanType } from '../subscription-plans/entities/subscription-plan.entity';

@Injectable()
export class UsersSubscriptionsService {
  constructor(
    @InjectModel(UserSubscription.name)
    private usersSubscriptionModel: Model<UserSubscription>,
    private readonly subscriptionPlansService: SubscriptionPlansService,
  ) {}
  async createSubscription(
    user: mongoose.Types.ObjectId,
    subscriptionPlanType: SubscriptionPlanType = SubscriptionPlanType.FREE,
    subscriptionType?: SubscriptionType,
  ): Promise<UserSubscription> {
    console.log(subscriptionPlanType);
    const subscriptionPlan =
      await this.subscriptionPlansService.findByPlanType(subscriptionPlanType);
    console.log(subscriptionPlan);
    return await this.create(
      user,
      subscriptionPlan._id,
      subscriptionType,
      subscriptionPlanType === SubscriptionPlanType.FREE ? null : new Date(),
      true,
    );
  }

  private async create(
    user: mongoose.Types.ObjectId,
    subscriptionPlan: mongoose.Types.ObjectId,
    subscriptionType?: SubscriptionType,
    endDate?: Date,
    autoRenewing?: boolean,
  ): Promise<UserSubscription> {
    return await this.usersSubscriptionModel.create({
      user,
      subscriptionPlan,
      subscriptionType,
      endDate,
      autoRenewing,
    });
  }
  async getUserSubscription(
    user: mongoose.Types.ObjectId,
  ): Promise<UserSubscription> {
    return await this.usersSubscriptionModel
      .findOne({ user })
      .populate('subscriptionPlan');
  }
  async checkUserSubscription(
    user: mongoose.Types.ObjectId,
    subscriptionPlanType: SubscriptionPlanType,
  ): Promise<boolean> {
    const userSubscription = await this.getUserSubscription(user);
    if ((userSubscription.subscriptionPlan as SubscriptionPlanDocument).type != subscriptionPlanType) throw new UnauthorizedException(`${SubscriptionPlanType[subscriptionPlanType]} subscription is required to use this feature`);
    if(userSubscription.endDate < new Date()) throw new UnauthorizedException(`${SubscriptionPlanType[subscriptionPlanType]} subscription is expired`);
    return true;
  }
}
