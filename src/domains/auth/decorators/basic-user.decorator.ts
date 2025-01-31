import { SetMetadata } from '@nestjs/common';

export const FREE_USER_KEY = 'free_user';
export const FreeUser = () => SetMetadata(FREE_USER_KEY, true);
