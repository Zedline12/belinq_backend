import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TEAM_ROLES_KEY } from '../decorators/roles.decorator';
import { TeamRole } from '../constants/constants';
import { TeamsService } from 'src/domains/teams/teams.service';
import mongoose from 'mongoose';
import { INVALID_TEAM_MEMBER } from 'src/errors/erros.constant';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly teamsService: TeamsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<TeamRole[]>(
      TEAM_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
      if(!requiredRoles) return true
    const { user } = context.switchToHttp().getRequest();
    const userTeamRole = await this.teamsService.getUserRole(
      user._id,
      new mongoose.Types.ObjectId('679eb305fbd337b0f0c10879'),
    );
    if (!userTeamRole)
      throw new UnauthorizedException(INVALID_TEAM_MEMBER
      );
     if(requiredRoles.includes(userTeamRole)) return true
    return false;
  }
}
