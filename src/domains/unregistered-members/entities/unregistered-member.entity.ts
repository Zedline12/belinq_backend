import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type UnRegisteredUserDocument = UnRegisteredUser & Document;
@Schema({ timestamps: true })
export class UnRegisteredUser {
  _id:mongoose.Types.ObjectId
  @ApiProperty({ type: String,required:true,example:"personalEmail@gmail.com" })
  @Prop({ type: String, required: true })
  email: string;
  @ApiProperty({ type: String,required:true,description:"List of all teams invited user" })
  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Teams',required:true })
  teams: mongoose.Types.ObjectId[];
   @ApiProperty({ type: Date,required:false })
  @Prop({ type: Date, default: Date.now(),required:false })
  invitationDate?: Date;
}
export const unregisteredUserSchema =
  SchemaFactory.createForClass(UnRegisteredUser);
