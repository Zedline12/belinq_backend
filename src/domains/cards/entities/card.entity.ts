import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
export class CardMetaData {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'MetaData' })
  type: string;
  @Prop({ type: String, required: true })
  value: string;
  @Prop({ type: String, required: true })
  title: string;
}
const CardMetaDataSchema = SchemaFactory.createForClass(CardMetaData);
export class Card {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    user: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: "Subscription", required: true })
    subscription: string;
    
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: false })
  jobTitle: string;
  @Prop({ type: String, required: false })
  department: string;
  @Prop({ type: String, required: false })
  headline: string;
  @Prop({ type: [String], required: false })
  accreditation: [string];
  @Prop({
    type: [CardMetaDataSchema],
    required: false,
  })
  metadata: CardMetaData[];
}
