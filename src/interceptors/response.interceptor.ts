import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiBasicResponse } from 'src/interfaces/response.interface';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map(
        (data) =>
          ({
            statusCode,
            message: statusCode >= 400 ? 'Error' : 'Success',
            error: statusCode >= 400 ? response.message : null,
            timestamp: Date.now(),
            version: request.originalUrl.split('/')[1],
            path: request.url,
            data,
          }) as ApiBasicResponse,
      ),
      // catchError((err) => {
      //   console.log(err)
      //   const statusCode = err instanceof HttpException ? err.getStatus() : 500;
      //   const errorResponse = {
      //     statusCode,
      //     //check for validation array messages
      //     message:Array.isArray(err.response.message) ? err.response.message : (err.message || 'Internal server error'),
      //     error: err.name || 'Error',
      //     timestamp: Date.now(),
      //     version: request.originalUrl.split('/')[1],
      //     path: request.url,
      //     data: {},
      //   } as ApiBasicResponse;
      //   return throwError(() => new HttpException(errorResponse, statusCode));
      // }),
    );
  }
}
