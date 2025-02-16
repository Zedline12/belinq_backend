import { PartialType } from '@nestjs/mapped-types';
import { CreateUnregisteredMemberDto } from './create-unregistered-member.dto';

export class UpdateUnregisteredMemberDto extends PartialType(CreateUnregisteredMemberDto) {}
