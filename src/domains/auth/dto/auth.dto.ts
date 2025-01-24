import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateIf,
  ValidationArguments,
} from 'class-validator';
export class LoginDto{
  @ApiProperty({type:String,example:'personalEmail@gmail.com',required:true})
  email: string;
  @ApiProperty({type:String,example:'password123',required:true})
  password: string;
}
export class GetOauthToken {
  @IsNotEmpty()
  @IsString()
  authorizationCode: string;
}

export class RegisterDto {
  @ApiProperty({
    minimum: 4,
    maximum: 100,
    example: 'Abdalla Mohamed',
    type: String,
    required: true,
  })
  @Length(4, 100)
  @IsNotEmpty()
  @IsString()
  public readonly name: string;
  @ApiProperty({
    example: 'personalEmail@gmail.com',
    description: 'email address for account',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
  @ApiProperty({
    minimum: 8,
    maximum: 50,
    example: 'password111',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @Length(8, 50)
  public readonly password: string;
  @ApiProperty({
    description:
      "phone number formatted with E.164 format which starts with '+{countrycode}{phonenumber}'",
    example: '+201099772095',
    type: Number,
    required: true,
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  public readonly phoneNumber: string;

  @ApiProperty({
    minimum: 1,
    maximum: 100,
    example: 'Microsoft',
    type: String,
    required: true,
  })
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  public readonly companyName: string;
  @ApiProperty({
    description: 'unique device id for example from device_info_plus libriary',
    example: 'deviceId121322',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public readonly deviceId: string;
  @ApiProperty({
    example: 'workEmail@gmail.com',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEmail()
  public readonly workEmail?: string;
  @ApiProperty({
    minimum: 2,
    maximum: 100,
    example: 'Software Engineer',
    type: String,
    required: false,
  })
  @IsString()
  @Length(2, 100)
  @IsOptional()
  public readonly jobTitle: string;
  @IsOptional()
  @ApiProperty({
    example: 'www.microsoft.com',
    description: 'Company website must be secured with https',
    type: String,
    required: false,
  })
  @IsString()
  @ValidateIf(
    (o: ValidationArguments) => !o.value || o.value.includes('https'),
    {
      message: 'company website must be secured with https',
    },
  )
  public readonly companyWebsite: string;
  @ApiProperty({
    description: 'logo cloud link',
    example: 'www.logolink.com',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly companyLogo: string;

  @ApiProperty({
    description: 'profile picture cloud link',
    example: 'www.profilelink.com',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly profilePicture: string;
}
