import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entites/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name:User.name, schema: userSchema }]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
