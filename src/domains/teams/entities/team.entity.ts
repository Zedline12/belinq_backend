import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
const member = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
});
export class Team {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  owner: string;
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'UserSubscription',
  })
  subscription: string;
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User', min: 3 })
  members: string[];
}
