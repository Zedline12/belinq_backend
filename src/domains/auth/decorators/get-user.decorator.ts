import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/domains/user/entites/user.entity';

export const GetUser = createParamDecorator(
  (_data: any, context: ExecutionContext):UserDocument => {
    const request = context.switchToHttp().getRequest();
    return request.user
  },
);
