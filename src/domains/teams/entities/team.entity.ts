import { Prop,Schema } from '@nestjs/mongoose';
import { lstatSync } from 'fs';
import mongoose from 'mongoose';
@Schema()
export class TeamMember{
  @Prop({required:true,type: mongoose.Types.ObjectId, ref: 'User' })
  user: string
  @Prop({ type: String, enum: ["editor", "viewer"], default: "editor" })
  access: string
  @Prop({ type: String, default: "employee" })
  section: string
  @Prop({type:Date,required:false})
  lastShared: Date
  @Prop({type:Number,required:false})
  numberOfShares:number
};
@Schema({ timestamps:true})
export class Team {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  owner: string;
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'UserSubscription',
  })
  subscription: string;
  @Prop({ required: false, type: [String] })
    sections:string[]
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  admin: string;
  @Prop({ required: true, type:[TeamMember]})
  members: [TeamMember];
}
