import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Theme } from 'src/theme/entities/theme.entity';

export enum ContentType {
  IMAGE = 'image',
  VIDEO = 'video',
  TEXT = 'text',
}

@Schema()
export class Content extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  title: string;

  @Prop({
    index: true,
    required: true,
    enum: ContentType,
  })
  type: string; // puede ser image, video o texto

  @Prop()
  url?: string; // para definir el tipo de enum: video o image

  @Prop()
  text?: string; // para definir el tipo de texto

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  credits: Types.ObjectId; // userName Creator

  @Prop({
    type: Types.ObjectId,
    ref: Theme.name,
    required: true,
  })
  themeId: string;
}

export const contentSchema = SchemaFactory.createForClass(Content);
