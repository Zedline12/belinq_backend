import { Test, TestingModule } from '@nestjs/testing';
import { UsersSubscriptionsController } from './users-subscriptions.controller';
import { UsersSubscriptionsService } from './users-subscriptions.service';

describe('UsersSubscriptionsController', () => {
  let controller: UsersSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersSubscriptionsController],
      providers: [UsersSubscriptionsService],
    }).compile();

    controller = module.get<UsersSubscriptionsController>(UsersSubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
