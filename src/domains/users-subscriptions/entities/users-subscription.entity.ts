import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { SubscriptionPlan, SubscriptionPlanDocument, SubscriptionPlanType } from 'src/domains/subscription-plans/entities/subscription-plan.entity';
export enum SubscriptionType {
  MONTHLY,
  SEMIANNUAL,
  ANNUAL,
}
export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
  PENDING = 'pending',
}
export enum PurchaseStates{
  PURCHASED = "purchased",
  PENDING = "pending",
  CANCELED = "canceled"
}
@Schema({ timestamps: true })
export class UserSubscription {
  @ApiProperty({
    description: 'The unique identifier of the user subscription.',
    type: String, // Representing ObjectId as a string in Swagger
    example: '605c72b2e56e9c001fd8e333',
  })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'The user associated with the subscription, referencing the User entity.',
    type: String,
    example: '605c72b2e56e9c001fd8e123',
  })
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'The subscription type, referencing the Subscription entity.',
    type: String,
    enum:Object.values(SubscriptionPlanType),
    example: '605c72b2e56e9c001fd8e444',
    default: SubscriptionPlanType.FREE
  })
  @Prop({ type: mongoose.Types.ObjectId, ref: 'SubscriptionPlan', required: true, default:SubscriptionPlanType.FREE })
  subscriptionPlan:mongoose.Types.ObjectId |SubscriptionPlanDocument;

  @ApiProperty({
    description: 'The type of subscription.',
    enum:Object.values(SubscriptionType),
    example: SubscriptionType.SEMIANNUAL,
  })
  @Prop({
    type: Number,
    required: false,
    enum: Object.keys(SubscriptionType),
  })
  subscriptionType?:SubscriptionType;

  @ApiProperty({
    description: 'The name of the subscription package.',
    type: String,
    example: 'Monthly Premium Plan',
    required: false,
  })
  @Prop({ type: String, required: false })
  packageName: string;

  @ApiProperty({
    description: 'The product ID associated with the subscription.',
    type: String,
    example: 'prod_123456',
    required: false,
  })
  @Prop({ type: String, required: false })
  productId: string;

  @ApiProperty({
    description: 'The purchase token for the subscription.',
    type: String,
    example: 'token_123456',
    required: false
  })
  @Prop({ type: String, required: false })
  purchaseToken: string;

  @ApiProperty({
    description: 'The purchase state of the subscription (0 = Purchased, 1 = Canceled, 2 = Pending).',
    enum: [0, 1, 2],
    example: 0,
    required: false,
  })
  @Prop({ type: Number, required: false, enum: [0, 1, 2] })
  purchaseState: number;

  @ApiProperty({
    description: 'The acknowledgement state of the subscription (0 = Not acknowledged, 1 = Acknowledged).',
    type: Number,
    enum: [0, 1],
    example: 1,
    required: false,
  })
  @Prop({ type: Number, required: false, enum: [0, 1] })
  acknowledgementState: boolean;

  @ApiProperty({
    description: 'The start date of the subscription.',
    type: Date,
    example: '2025-02-01T10:00:00.000Z',
    required: false,
  })
  @Prop({ type: Date, required: false, default: Date.now() })
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the subscription.',
    type: Date,
    example: '2025-03-01T10:00:00.000Z',
    required: false,
  })
  @Prop({ type: Date, required: false })
  endDate: Date;

  @ApiProperty({
    description: 'The status of the subscription.',
    enum: Object.values(SubscriptionStatus),
    example: SubscriptionStatus.ACTIVE,
    required: false,
  })
  @Prop({ type: Boolean, required: false, enum: Object.values(SubscriptionStatus) })
  subscriptionStatus: string;

  @ApiProperty({
    description: 'Indicates if the subscription is set to auto-renew.',
    type: Boolean,
    example: true,
    required: false,
  })
  @Prop({ type: Boolean, required: false })
  autoRenewing: boolean;
}
export const userSubscriptionSchema =
  SchemaFactory.createForClass(UserSubscription);
