import { forwardRef, Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MailModule } from 'src/providers/mail/mail.module';
import { UserModule } from '../user/user.module';
import { UnregisteredUsersModule } from '../unregistered-members/unregistered-members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, teamSchema } from './entities/team.entity';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';
import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { AuthModule } from '../auth/auth.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports:[forwardRef(()=>AuthModule),MongooseModule.forFeature([{name:Team.name,schema:teamSchema}]),MailModule,UserModule,UnregisteredUsersModule,UsersSubscriptionsModule,SubscriptionPlansModule,CardsModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports:[TeamsService]
})
export class TeamsModule {}
