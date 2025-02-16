import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
export type SubscriptionPlanDocument = SubscriptionPlan & Document;
export enum SubscriptionPlanType{
  FREE,
  PREMIUM,
  TEAMS
}
@Schema({ timestamps: true })
export class SubscriptionPlan {
  _id:mongoose.Types.ObjectId
  @Prop({ required: true, type: String, enum: ['free','premium', 'teams'] })
  name: string;
  @Prop({required:true,type:Number,enum:[0,1,2]})
  type:SubscriptionPlanType
  @Prop({ required: false, type: Number })
  monthlyPayment: number;
  @Prop({ required: false, type: Number })
  semiAnnualPayment: number;
  @Prop({ required: false, type: Number })
  annualPayment: number;
}
export const SubscriptionPlanSchema =
  SchemaFactory.createForClass(SubscriptionPlan);
