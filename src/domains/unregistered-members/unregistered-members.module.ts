import { Module } from '@nestjs/common';
import { UnregisteredUsersService } from './unregistered-members.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  UnRegisteredUser, unregisteredUserSchema } from './entities/unregistered-member.entity';
import { MailModule } from 'src/providers/mail/mail.module';

@Module({
  imports:[MongooseModule.forFeature([{name:UnRegisteredUser.name,schema:unregisteredUserSchema}]),MailModule],
  providers: [UnregisteredUsersService],
  exports:[UnregisteredUsersService]
})
export class UnregisteredUsersModule {}
