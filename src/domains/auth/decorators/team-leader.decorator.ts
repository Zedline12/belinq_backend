import { SetMetadata } from '@nestjs/common';

export const TEAM_ADMIN_KEY = 'team_admin';
export const TeamAdmin = () => SetMetadata(TEAM_ADMIN_KEY, true);
