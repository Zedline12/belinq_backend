import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cardSchema } from './entities/card.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Card', schema: cardSchema}]),ConfigModule,JwtModule,UserModule
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
