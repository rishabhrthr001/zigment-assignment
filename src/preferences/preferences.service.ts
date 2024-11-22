import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserPreference,
  UserPreferenceDocument,
} from '../schemas/user-preference.schema';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(preference: UserPreference): Promise<UserPreference> {
    return this.userPreferenceModel.create(preference);
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel.findOne({ userId });
    if (!preference) throw new NotFoundException('User not found');
    return preference;
  }

  async update(
    userId: string,
    updates: Partial<UserPreference>,
  ): Promise<UserPreference> {
    const updated = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updates,
      { new: true },
    );
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0)
      throw new NotFoundException('User not found');
  }
}
