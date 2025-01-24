import { SetMetadata } from '@nestjs/common';

export const PREMIUM_USER_KEY = 'premium_user';
export const PremiumUser = () => SetMetadata(PREMIUM_USER_KEY, true);
