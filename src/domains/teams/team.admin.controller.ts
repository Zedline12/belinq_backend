import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, CreateTeamResponseDto } from './dto/team.dto';
import { JwtAuthGuard } from '../auth/guards/access-token.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { TeamRolesGuard } from '../auth/guards/team-roles.guard';
import { TeamRoles } from '../auth/decorators/roles.decorator';
import { TeamRole } from '../auth/constants/constants';
import { BasicApiDecorators } from 'src/decorators/swagger.decorators';
import mongoose from 'mongoose';
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}



  @Get(":id/users")
  @UseGuards(TeamRolesGuard)
  async findAll(@GetUser() user,@Param('id') teamId: string) {
      return await this.teamsService.getAllMembers(new mongoose.Types.ObjectId(teamId));
  }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto) {
  //   return this.teamsService.update(+id, updateTeamDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
