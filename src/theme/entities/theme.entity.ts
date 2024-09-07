import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Theme extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  allowsImage: boolean;

  @Prop({ required: true })
  allowsVideos: boolean;

  @Prop({ required: true })
  allowsTexts: boolean;
}

export const themeSchema = SchemaFactory.createForClass(Theme);
