import { Injectable } from '@nestjs/common';
import { CreateUsersSubscriptionDto } from './dto/create-users-subscription.dto';
import { UpdateUsersSubscriptionDto } from './dto/update-users-subscription.dto';

@Injectable()
export class UsersSubscriptionsService {
  create(createUsersSubscriptionDto: CreateUsersSubscriptionDto) {
    return 'This action adds a new usersSubscription';
  }

  findAll() {
    return `This action returns all usersSubscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersSubscription`;
  }

  update(id: number, updateUsersSubscriptionDto: UpdateUsersSubscriptionDto) {
    return `This action updates a #${id} usersSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersSubscription`;
  }
}
