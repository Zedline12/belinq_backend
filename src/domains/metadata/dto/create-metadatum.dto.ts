import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  logo: string;
}
