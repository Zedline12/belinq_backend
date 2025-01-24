import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { CreateUsersSubscriptionDto } from './dto/create-users-subscription.dto';
import { UpdateUsersSubscriptionDto } from './dto/update-users-subscription.dto';

@Controller('users-subscriptions')
export class UsersSubscriptionsController {
  constructor(private readonly usersSubscriptionsService: UsersSubscriptionsService) {}

  @Post()
  create(@Body() createUsersSubscriptionDto: CreateUsersSubscriptionDto) {
    return this.usersSubscriptionsService.create(createUsersSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.usersSubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersSubscriptionDto: UpdateUsersSubscriptionDto) {
    return this.usersSubscriptionsService.update(+id, updateUsersSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersSubscriptionsService.remove(+id);
  }
}
