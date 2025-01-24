import { Test, TestingModule } from '@nestjs/testing';
import { UsersSubscriptionsService } from './users-subscriptions.service';

describe('UsersSubscriptionsService', () => {
  let service: UsersSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSubscriptionsService],
    }).compile();

    service = module.get<UsersSubscriptionsService>(UsersSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
