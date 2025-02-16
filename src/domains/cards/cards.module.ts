import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, cardSchema } from './entities/card.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Card.name, schema: cardSchema}]),ConfigModule,JwtModule,UserModule,UsersSubscriptionsModule
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports:[CardsService]
})
export class CardsModule {}
