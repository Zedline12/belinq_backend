import { SetMetadata } from '@nestjs/common';
import { TeamRole } from '../constants/constants';


export const TEAM_ROLES_KEY = 'roles';
export const TeamRoles = (...roles: TeamRole[]) => SetMetadata(TEAM_ROLES_KEY, roles);