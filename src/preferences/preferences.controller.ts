import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UserPreference } from '../schemas/user-preference.schema';
import { Logger } from '@nestjs/common';

@Controller('api/preferences')
export class PreferencesController {
  private readonly logger = new Logger(PreferencesController.name);
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  async create(@Body() preference: UserPreference) {
    return this.preferencesService.create(preference);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.preferencesService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updates: Partial<UserPreference>,
  ) {
    return this.preferencesService.update(userId, updates);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
