import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class UserSubscription {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subscription' })
  subscription: string;
  @Prop({
    type: String,
    required: true,
    enum: ['monthly', 'semiannual', 'annual'],
  })
  type: string;
  @Prop({ type: Date, required: true, default: Date.now() })
  startDate: Date;
  @Prop({ type: Date, required: true })
  endDate: Date;
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;
  @Prop({ type: Boolean, required: true })
  isRenewal: boolean;
}
export const userSubscriptionSchema =
  SchemaFactory.createForClass(UserSubscription);
