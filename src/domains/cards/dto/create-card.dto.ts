import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsOptional,
  ValidateIf,
  ValidationArguments,
  IsNotEmpty,
} from 'class-validator';
import { CardMetaData } from '../entities/card.entity';

export class CreateCardDto {
  @ApiProperty({
    type: String,
    required: true,
    name: 'image',
  })
  @IsNotEmpty()
  @IsString()
  public readonly image: string;
  @ApiProperty({
    type: String,
    required: true,
    name: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  public readonly firstName: string;
  @ApiProperty({
    type: String,
    required: false,
    name: 'lastName',
  })
  @IsOptional()
  @IsString()
  public readonly lastName: string;
  @ApiProperty({
    minimum: 2,
    maximum: 100,
    example: 'Software Engineer',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'email@gmail.com',
    type: String,
    required: false,
  })
  public readonly email: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '01099772095',
    type: String,
    required: false,
  })
  public readonly phoneNumber: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'hex background color,the default is white',
    example: '#ffffff',
    type: String,
    required: false,
  })
  public readonly backgroundColor: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Linqit',
    type: String,
    required: false,
  })
  public readonly companyName: string;
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
    type: [CardMetaData],
    description: 'Card metadata like mobile number or website url',
    required: false,
  })
  @IsOptional()
  public readonly metaData: CardMetaData[];
}
