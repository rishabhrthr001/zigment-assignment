import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

enum Frequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class UserPreference {
  @Prop({ required: true })
  userId: string;

  @Prop({
    required: true,
    validate: {
      validator: (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      message: 'Invalid email format',
    },
  })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: (timezone: string) =>
        /^(?:[A-Za-z]{3,10})(?:\/[A-Za-z0-9_+\/-]{1,255})?$/.test(timezone),
      message: 'Invalid timezone format',
    },
  })
  timezone: string;

  @Prop({
    type: String,
    required: true,
    enum: Frequency,
  })
  frequency: Frequency;

  @Prop({
    type: Object,
    required: true,
    validate: {
      validator: (preferences: any) =>
        typeof preferences.marketing === 'boolean' &&
        typeof preferences.newsletter === 'boolean' &&
        typeof preferences.updates === 'boolean' &&
        typeof preferences.channels.email === 'boolean' &&
        typeof preferences.channels.sms === 'boolean' &&
        typeof preferences.channels.push === 'boolean',
      message: 'Invalid preferences structure',
    },
  })
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({
    type: String,
    required: true,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}

export type UserPreferenceDocument = UserPreference & Document;
export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
