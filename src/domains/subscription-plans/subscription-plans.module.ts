import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlan, SubscriptionPlanSchema } from './entities/subscription-plan.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: SubscriptionPlan.name, schema: SubscriptionPlanSchema }])], 
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
