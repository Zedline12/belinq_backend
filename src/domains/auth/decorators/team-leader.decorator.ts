import { SetMetadata } from '@nestjs/common';

export const TEAM_LEADER_KEY = 'team_leader';
export const TeamLeader = () => SetMetadata(TEAM_LEADER_KEY, true);
