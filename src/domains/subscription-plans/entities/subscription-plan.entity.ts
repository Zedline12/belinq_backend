import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type SubscriptionPlanDocument = SubscriptionPlan & Document;
@Schema({ timestamps: true })
export class SubscriptionPlan {
  @Prop({ required: true, type: String, enum: ['premium', 'teams'] })
  name: string;
  @Prop({ required: true, type: Number })
  monthlyPayment: number;
  @Prop({ required: true, type: Number })
  semiAnnualPayment: number;
  @Prop({ required: true, type: Number })
  annualPayment: number;
}
export const SubscriptionPlanSchema =
  SchemaFactory.createForClass(SubscriptionPlan);
