import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { object } from '@ucast/core';
import { lstatSync } from 'fs';
import mongoose from 'mongoose';
export enum TeamMemberRole{
 MEMBER="member",
 ADMIN="admin"
}
export enum TeamMemberAccess {
  EDITOR = "editor",
  VIEWER = "viewer",
}
export enum TeamSection{
  EMPLOYEES = "employees",
  SALES = "sales",
  MARKETING = "marketing",
  FINANCE = "finance",
  HR = "hr",
}
export type TeamDocument = Team & mongoose.Document;
@Schema()
export class TeamMember {
  
  @ApiProperty({
    description: 'The ID of the user associated with the team member',
    type: String,  // Since it's a MongoDB ObjectId
    required: true
  })
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'The role of the team member',
    enum: Object.values(TeamMemberRole),
    default: 'member',
    required: true
  })
  @Prop({ required: true, type: String, enum: Object.values(TeamMemberRole), default: 'member' })
  role: TeamMemberRole;

  @ApiProperty({
    description: 'The access level of the team member',
    enum: Object.values(TeamMemberAccess),
    default: 'editor',
    required: false
  })
  @Prop({ type: String, enum: Object.values(TeamMemberAccess), default: 'editor', required: false })
  access?: TeamMemberAccess;

  @ApiProperty({
    description: 'The section of the team the member belongs to',
    enum:Object.values(TeamSection),
    default: 'employee',
    required: false
  })
  @Prop({ type: String, enum: Object.values(TeamSection), default: 'employees', required: false })
  section?: TeamSection;

  @ApiProperty({
    description: 'The date when the team member last shared something',
    type: Date,
    required: false
  })
  @Prop({ type: Date, required: false })
  lastShared?: Date;

  @ApiProperty({
    description: 'The number of shares made by the team member',
    type: Number,
    required: false
  })
  @Prop({ type: Number, required: false })
  numberOfShares?: number;
}
export class UnRegisteredTeamMember extends PickType(TeamMember, ['role', 'section', 'access'] as const) {
  @ApiProperty({ type: mongoose.Types.ObjectId, required: true,description:"user id but in unregistered members collection not in normal users collection" })
 @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'UnRegisteredMember' })
 unregisteredUser: mongoose.Types.ObjectId
}
@Schema({ timestamps:true})
export class Team {
  @ApiProperty({
    description: 'The owner of the team, referencing the User entity.',
    type: String, // Representing ObjectId as a string in Swagger
    example: '605c72b2e56e9c001fd8e333',
  })
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'The sections associated with the team.',
    type: [String],
    example:Object.values(TeamSection),
    required: false,
  })
  @Prop({ required: false, type: [String] })
  sections: TeamSection[];

  @ApiProperty({
    description: 'The list of registered team members.',
    type: [TeamMember],
    example: [
      { id: '123', name: 'John Doe', role: 'Developer' },
      { id: '124', name: 'Jane Smith', role: 'Designer' },
    ],
  })
  @Prop({ required: true, type: [TeamMember] })
  members: TeamMember[];

  @ApiProperty({
    description: 'The list of unregistered team members.',
    type: [UnRegisteredTeamMember],
    example: [
      { name: 'Guest 1', email: 'guest1@example.com' },
      { name: 'Guest 2', email: 'guest2@example.com' },
    ],
    required: false,
  })
  @Prop({ type: [UnRegisteredTeamMember], required: false })
  unregisteredMembers: UnRegisteredTeamMember[];
}
export const teamSchema = SchemaFactory.createForClass(Team);
