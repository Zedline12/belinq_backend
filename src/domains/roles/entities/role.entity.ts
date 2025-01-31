import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({
    required: true,
    type: [{ action: String, subject: String, conditions: Object }],
  })
  permissions: [{ action: String; subject: String; conditions?: Object }];
}
