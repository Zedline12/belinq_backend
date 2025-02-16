import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class LoginInfo {
  loginDate: Date;
  deviceId: string;
  firstLogin: boolean;
}
@Schema({ timestamps: true })
@Expose()
export class User {
  _id: mongoose.Types.ObjectId;
  @ApiProperty({ type: String, required: true, example: 'Abdallah' })
  @Prop({ required: true, type: String })
  firstName: string;
  @ApiProperty({ type: String, required: false, example: 'Mohamed' })
  @Prop({ required: false, type: String })
  lastName?: string;
  @Prop({ required: true, type: String })
  @ApiProperty({ type: String, required: true, example: 'email' })
  email: string;
  @ApiProperty({ type: [String], required: false,description:"List of teams ids that user in refers the team entity", example:["54645645665456","675645656456"] })
  @Prop({ required: false, type: [mongoose.Types.ObjectId], ref: 'Team' })
  teams?: string[];
  @Exclude()
  @Prop({ required: true, type: String })
  hashedPassword: string;
  @Prop({ required: false, type: String })
  @ApiProperty({ type: String, required: false,description:"phone number with E.164 format",example:["+201099772095"] })
  phoneNumber: string;
  @ApiProperty({ type: String, required: false,example:"bedomohamed307@gmail.com" })
  @Prop({ required: false, type: String })
  workEmail?: string;
  @Prop({ required: false, type: String })
  @ApiProperty({ type: String, required: false,example:"http://www.example.com",description:"Profile Picutre Link" })
  profilePicture?: string;
  @Prop({ required: false, type: String })
  activeRefreshToken?: string;
  @Prop({
    required: false,
    type: [{ isSharedBack: Boolean, card: String, sharedBackDate: Date }],
  })
  @ApiProperty({ type: [String], required: false,example:["cardId1","cardId2"] })
  contacts?: string[];
  passwordCheck: (password: string) => boolean;
  revokeRefreshToken: () => void;
  saveRefreshToken: (refreshToken: string) => void;
}
export const userSchema = SchemaFactory.createForClass(User);
userSchema.methods.revokeRefreshToken = function (): void {
  this.activeRefreshToken = null;
  return this.save();
};
userSchema.methods.saveRefreshToken = function (refreshToken: string): void {
  this.activeRefreshToken = refreshToken;
  return this.save();
};
userSchema.methods.passwordCheck = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.hashedPassword);
};
userSchema.pre('save', async function (next) {
  if (this.isModified('hashedPassword')) {
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  }
  next();
});
