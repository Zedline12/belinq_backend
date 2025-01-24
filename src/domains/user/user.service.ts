import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entites/user.entity';
import {
  COMPANY_USER_CONFLICT,
  EMAIL_USER_CONFLICT,
  PHONE_USER_CONFLICT,
} from 'src/errors/erros.constant';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public async create(
    name: string,
    email: string,
    hashedPassword: string,
    phoneNumber: string,
    companyName: string,
    workEmail?: string,
    jobTitle?: string,
    companyWebsite?: string,
    companyLogo?: string,
    profilePicture?: string,
    activeRefreshToken?: string,
  ): Promise<User> {
    const testUser = await this.userModel.findOne({
      $or: [{ email }, { phoneNumber }, { companyName }],
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
      name,
      email,
      hashedPassword,
      phoneNumber,
      companyName,
      workEmail,
      jobTitle,
      companyWebsite,
      companyLogo,
      profilePicture,
      activeRefreshToken,
    });
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
}
