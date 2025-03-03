import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Contact {
  @ApiProperty({
    description: 'The unique identifier of the user subscription.',
    type: String, // Representing ObjectId as a string in Swagger
    example: '605c72b2e56e9c001fd8e333',
  })
  _id: mongoose.Types.ObjectId;

 
}
export const contactSchema =
  SchemaFactory.createForClass(Contact);
