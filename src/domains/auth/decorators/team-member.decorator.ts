import { SetMetadata } from '@nestjs/common';

export const TEAM_MEMBER_KEY = 'team_member_key';
export const TeamMember = () => SetMetadata(TEAM_MEMBER_KEY, true);
