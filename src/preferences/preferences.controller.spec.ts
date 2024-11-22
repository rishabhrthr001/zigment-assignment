import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from './user-preference.schema';

describe('PreferencesController', () => {
  let controller: PreferencesController;
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferencesController],
      providers: [
        PreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PreferencesController>(PreferencesController);
    service = module.get<PreferencesService>(PreferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
