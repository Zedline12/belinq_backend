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
    maximum: 50,
    example: 'Bedo',
    type: String,
    required: true,
  })
  @Length(1, 50)
  @IsNotEmpty()
  @IsString()
  public readonly firstName: string;
  @ApiProperty({
    minimum: 4,
    maximum: 50,
    example: 'Mohamed',
    type: String,
    required: false,
  })
  @Length(1, 50)
  @IsOptional()
  @IsString()
  public readonly lastName: string;
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
    description: 'profile picture cloud link',
    example: 'www.profilelink.com',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly profilePicture: string;
}
