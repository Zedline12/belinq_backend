import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { BASIC_USER_KEY } from 'src/domains/auth/decorators/basic-user.decorator';
import { ADMIN_KEY } from 'src/domains/auth/decorators/admin.decorator';
import { TEAM_LEADER_KEY } from 'src/domains/auth/decorators/team-leader.decorator';
import { TEAM_MEMBER_KEY } from 'src/domains/auth/decorators/team-member.decorator';
import { PREMIUM_USER_KEY } from 'src/domains/auth/decorators/premium-user.decorator';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
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
  _id:string
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  email: string;
  @Exclude()
  @Prop({ required: true, type: String })
  hashedPassword: string;
  @Prop({ required: true, type: Number })
  phoneNumber: string;
  @Prop({ required: false, type: String })
  workEmail: string;
  @Prop({ required: false, type: String })
  profilePicture: string;
  @Prop({ required: false, type: [String], enum:[BASIC_USER_KEY,PREMIUM_USER_KEY,TEAM_LEADER_KEY,TEAM_MEMBER_KEY,ADMIN_KEY],default:BASIC_USER_KEY })
  roles: string[];
  @Prop({ required: false, type: String })
  activeRefreshToken: string;
  passwordCheck: (password: string) => boolean;
  revokeRefreshToken: () => void
  saveRefreshToken:(refreshToken:string)=>void
}
export const userSchema = SchemaFactory.createForClass(User);
userSchema.methods.revokeRefreshToken = function ():void {
  this.activeRefreshToken = null;
  return this.save()
}
userSchema.methods.saveRefreshToken = function (refreshToken:string):void {
  this.activeRefreshToken = refreshToken;
  return this.save()
}
userSchema.methods.passwordCheck = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.hashedPassword);
};
userSchema.pre('save', async function (next) {
  if (this.isModified('hashedPassword')) {
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  }
  next();
});