import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { UserRole } from 'src/auth/enums/rol.enum';

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
    required: true,
  })
  password: string;

  @Prop({
    enum: UserRole,
    required: true,
    lowercase: true,
  })
  role: string;

  @Prop({
    type: Date,
    default: null,
  })
  deleteAt?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);
