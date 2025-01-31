import { BadRequestException } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Subscription } from 'rxjs';
export type CardDocument = Card & Document;
@Schema()
export class CardMetaData {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'MetaData' })
  type: string;
  @Prop({ type: String, required: true })
  value: string;
  @Prop({ type: String, required: true })
  title: string;
}
const CardMetaDataSchema = SchemaFactory.createForClass(CardMetaData);
@Schema({ timestamps: true })
export class Card {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: false })
  user: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'UserSubscriptions' })
  subscription: string;
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ required: false, type: Number })
  phoneNumber: string;
  @Prop({ required: false, type: String })
  email: string;
  @Prop({ type: String, required: false })
  lastName: string;
  @Prop({ type: String, required: false })
  jobTitle: string;
  @Prop({ type: String, required: false })
  department: string;
  @Prop({ type: String, required: false })
  companyName: string;
  @Prop({ type: String, required: false })
  headline: string;
  @Prop({ type: String, required: false, default: '#ffffff' })
  backgroundColor: string;
  @Prop({ type: [String], required: false })
  accreditation: [string];
  @Prop({
    type: [
      {
        type: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'MetaData',
        },
        value: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    required: false,
  })
  metaData: [CardMetaData];
}
export const cardSchema = SchemaFactory.createForClass(Card);
