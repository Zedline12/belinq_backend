import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionPlan } from './entities/subscription-plan.entity';

@Injectable()
export class SubscriptionPlansService {
  constructor(@InjectModel(SubscriptionPlan.name) private subscriptionPlanModel: Model<SubscriptionPlan>,){}
  public async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return await this.subscriptionPlanModel.create(createSubscriptionPlanDto)
  }

  findAll() {
    return `This action returns all subscriptionPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionPlan`;
  }

  update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return `This action updates a #${id} subscriptionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionPlan`;
  }
}
