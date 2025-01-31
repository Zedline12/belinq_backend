import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema()
export class MetaData {
 
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  logo: string;
}
export type MetaDocument = MetaData & mongoose.Document;
export const metaDataSchema = SchemaFactory.createForClass(MetaData);
