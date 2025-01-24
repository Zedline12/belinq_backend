import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersSubscriptionDto } from './create-users-subscription.dto';

export class UpdateUsersSubscriptionDto extends PartialType(CreateUsersSubscriptionDto) {}
