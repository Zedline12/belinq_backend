import { BadRequestException } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { Subscription } from 'rxjs';
export enum CardType{
  USER="user",
  TEAM="team"
}
export type CardDocument = Card & Document;
export class CardQrImageView{
  data: string;
  size: number;
  embeddedImage: string;
}
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
  @ApiProperty({ type: String,required: true,name:'UserId',example:"958495jf93f" })
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Types.ObjectId;
  @Prop({ type: String, enum:Object.values(CardType),required: true })
  type: string
  @ApiProperty({ type: String,required: false,example:"if the card is team type,assigned to member in team" })
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: false })
  assignedTo?: mongoose.Types.ObjectId;
  @ApiProperty({ type: mongoose.Types.ObjectId, required: false })
  @Prop({ type: mongoose.Types.ObjectId, ref: "Team", required: false })
  teamId?: mongoose.Types.ObjectId;
  @ApiProperty({ type: String,required: true,example:"Abdallah" })
  @Prop({ type: String, required: false })
  firstName?: string;
  @ApiProperty({ type: String,required: false,example:"01099772095" })
  @Prop({ required: false, type:String })
  phoneNumber?: string;
  @ApiProperty({ type: String,required: false,example:"bedomohamed307@gmail.com" })
  @Prop({ required: false, type: String })
  email?: string;
  @ApiProperty({ type: String,required: false,example:"Mohamed" })
  @Prop({ type: String, required: false })
  lastName?: string;
  @ApiProperty({ type: String,required: false,example:"Software Engineer" })
  @Prop({ type: String, required: false })
  jobTitle?: string;
  @ApiProperty({ type: String,required: false,example:"IT" })
  @Prop({ type: String, required: false })
  department?: string;
  @ApiProperty({ type: String,required: false,example:"Linqit" })
  @Prop({ type: String, required: false })
  companyName?: string;
  @ApiProperty({ type: String,required: false,example:"Linqit" })
  @Prop({ type: String, required: false })
  headline?: string;
  @ApiProperty({ type: String,required: false,example:"#ffffff",description:"By default its #ffffff" })
  @Prop({ type: String, required: false, default: '#ffffff' })
  backgroundColor?: string;
  @ApiProperty({ type: String,required: false,description:"List of certifications ",example:"Ceo,Cpa" })
  @Prop({ type: [String], required: false })
  accreditation?: [string];
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
  metaData?: [CardMetaData];
  @ApiProperty({ type: CardQrImageView,required: false,description:"Qr Image View data for rendering in flutter",example:{data:"http://link.com",embededImage:"http://linqit/logo.com",size:100} })
  @Prop({ type:CardQrImageView, required: false })
  qrImageView?:CardQrImageView
}
export const cardSchema = SchemaFactory.createForClass(Card);
