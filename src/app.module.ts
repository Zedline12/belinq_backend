import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configFunc from './config/configration';
import { AuthModule } from './domains/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './domains/user/user.module';
import { CardsModule } from './domains/cards/cards.module';
import { MetadataModule } from './domains/metadata/metadata.module';
import { SubscriptionPlansModule } from './domains/subscription-plans/subscription-plans.module';
import { TeamsModule } from './domains/teams/teams.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CardsModule,
    TeamsModule,
    MetadataModule,
    SubscriptionPlansModule,
    ConfigModule.forRoot({ load: [configFunc] }),
    MongooseModule.forRoot(
      'mongodb+srv://bedomohamed307:bedo3077@benova.vakc3.mongodb.net/',
      {
        dbName: 'linqit',
        connectionFactory: (connection) => {
          connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          connection.on('connected', () => {
            console.log('MongoDB connected');
          });
          connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
          });
          return connection;
        },
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
