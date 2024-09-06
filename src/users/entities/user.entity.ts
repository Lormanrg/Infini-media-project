import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  userName: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  email: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  password: string;

  @Prop({
    enum: ['admin', 'creator', 'reader'],
    required: true,
  })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
