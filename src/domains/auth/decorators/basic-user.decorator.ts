import { SetMetadata } from '@nestjs/common';

export const BASIC_USER_KEY = 'basic_user';
export const BasicUser = () => SetMetadata(BASIC_USER_KEY, true);
