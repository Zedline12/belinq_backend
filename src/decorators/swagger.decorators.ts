import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BasicResponse } from 'src/constants/basic-response';
export interface ClassConstructor {
  new (...args: any[]): {};
}

class ParamsDto {
  responseCode: number;

  isArray: boolean;

  operation: {
    summary: string;
    deprecated?: boolean;
    description?: string;
  };

  response: any;

  description: string;

  tag?: string;
}
export function BasicApiDecorators(ParamsDto: ParamsDto) {
  return applyDecorators(
    ...(ParamsDto.tag ? [ApiTags(ParamsDto.tag)] : []),
    ApiOperation(ParamsDto.operation),
   
    // custom api response
    ApiResponse({
      type: ParamsDto.response,
      isArray: ParamsDto.isArray,
      status: ParamsDto.responseCode,
      description: ParamsDto.description,
    }),
    //bad request response
    ApiResponse({
      type: BasicResponse,
      status: 0,
      description: `${HttpStatus.BAD_REQUEST} - Bad Request || ${HttpStatus.NOT_FOUND} - Not Found || ${HttpStatus.FORBIDDEN} - Forbidden || ${HttpStatus.INTERNAL_SERVER_ERROR} - Internal Server Error`,
    }),
  );
}
