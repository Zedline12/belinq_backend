import {
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo, ObjectId } from 'mongoose';
import { User, UserDocument } from './entites/user.entity';
import {
  EMAIL_USER_CONFLICT,
  PHONE_USER_CONFLICT,
} from 'src/errors/erros.constant';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { CacheService, CacheType } from '../cache/cache.service';
import { GetHomePageResponse } from './dto/user.dto';
import { CardsService } from '../cards/cards.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
    private readonly cardService:CardsService
  ) { }
  public async getHomePage(userId:mongoose.Types.ObjectId): Promise<GetHomePageResponse> {
    return { cards: await this.cardService.findAllByUserId(userId) }
  }
  public async create(
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    phoneNumber: string,
    workEmail?: string,
    profilePicture?: string,
    activeRefreshToken?: string,
  ): Promise<User> {
    const testUser = await this.userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (testUser) {
      if (testUser.email == email) {
        throw new ConflictException(EMAIL_USER_CONFLICT);
      }
      if (testUser.phoneNumber == phoneNumber) {
        throw new ConflictException(PHONE_USER_CONFLICT);
      }
    }
    return await this.userModel.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      workEmail,
      profilePicture,
      activeRefreshToken,
    });
  }
  public async changeUserEmail(id:mongoose.Types.ObjectId, email: string): Promise<HttpException | string> {
    const emailExists = await this.userModel.findOne({ email })
    if (emailExists) throw new ConflictException(EMAIL_USER_CONFLICT)
    await this.userModel.updateOne({ _id: id }, { email })
    return 'Email updated successfully'
  }
  public async checkPremiumSubscription(userId:mongoose.Types.ObjectId): Promise<void> {
    const user = (await this.userModel.findById(userId).populate('subscription'))
    console.log(user)
  }
  public async getValidateUserByBasicAuth(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.findUser({ email });
    if (user && (await user.passwordCheck(password))) {
      return user;
    }
    return null;
  }
  public async subscribe(userId:mongoose.Types.ObjectId, subscriptionId:mongoose.Types.ObjectId): Promise<void> {
    
  }

  public async findUserById(id: mongoose.Types.ObjectId): Promise<UserDocument | null > {
   
    // 2️⃣ Fetch from Database if not in cache
    return await this.userModel.findById(id);
  }
  public async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }
  public async revokeRefreshToken(userId): Promise<void> {
    (await this.userModel.findById(userId)).revokeRefreshToken();
  }
  public async saveRefreshToken(userId, refreshToken): Promise<void> {
    (await this.userModel.findById(userId)).saveRefreshToken(refreshToken);
  }
  public async findUser(
    query: Partial<Record<keyof User, string | number | boolean>>,
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne(query);
  }
  public async find(query: Partial<Record<keyof User, string | number | {}>>) {
    return await this.userModel.find(query);
  }
}
