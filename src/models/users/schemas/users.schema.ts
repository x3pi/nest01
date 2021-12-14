import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/authentication/role/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
