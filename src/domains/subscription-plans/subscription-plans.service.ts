import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SubscriptionPlan,
  SubscriptionPlanDocument,
  SubscriptionPlanType,
} from './entities/subscription-plan.entity';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectModel(SubscriptionPlan.name)
    private subscriptionPlanModel: Model<SubscriptionPlan>,
  ) {}
  // public async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
  //   return await this.subscriptionPlanModel.create(createSubscriptionPlanDto)
  // }
  public async findByPlanType(
    planType: SubscriptionPlanType,
  ): Promise<SubscriptionPlanDocument | null> {
    return await this.subscriptionPlanModel.findOne({ type: planType });
  }
}
