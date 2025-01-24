import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class SubscriptionPlan {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: Number })
  monthlyPayment: number;
  @Prop({ required: true, type: Number })
  semiAnnualPayment: number;
  @Prop({ required: true, type: Number })
  annualPayment: number;
}
