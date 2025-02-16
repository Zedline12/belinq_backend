import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import {
  SubscriptionPlan,
  SubscriptionPlanSchema,
} from './entities/subscription-plan.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionPlan.name, schema: SubscriptionPlanSchema },
    ]),
  ],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
