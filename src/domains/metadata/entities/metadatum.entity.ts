import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class MetaData {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  logo: string;
}
export type MetaDocument = MetaData & mongoose.Document;
export const metadataSchema = SchemaFactory.createForClass(MetaData);
