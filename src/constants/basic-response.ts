import { ApiProperty } from '@nestjs/swagger';
import {  TokensResponse } from 'src/domains/auth/auth.interface';

export class BasicResponse {
  @ApiProperty({
    type: Number,
    description: 'Response Status Code',
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    description: 'Respone Message',
    example: 'Error message',
  })
  message: string;
  @ApiProperty({
    type: String || null,
    description: 'Respone Error Message',
    example: 'Exception Type',
  })
  error: string | null;
  @ApiProperty({
    type: Number,
    description:
      'Represents the number of seconds (or milliseconds) since January 1, 1970, 00:00:00 UTC',
    example: 1934345,
  })
  timestamp: Number;
  @ApiProperty({
    type: String,
    description: 'Represents the version of the API',
    example: 'v1',
  })
  version: string;
  @ApiProperty({
    type: String,
    description: 'Represents the path of the request',
    example: '/',
  })
  path: string;
  @ApiProperty({
    type: Object,
    description: 'Represents the data of the response',
  })
  data: any;
}
