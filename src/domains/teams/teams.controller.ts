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
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
      @BasicApiDecorators({
        responseCode: 200,
        isArray: false,
        operation: {
          summary: 'Creates a new team',
        },
        response:CreateTeamResponseDto,
        
        description: 'Creates a new team with members and admin with minimum of 3 members and one amdin',
      })
    
  create(@GetUser() user, @Body() createTeamDto: CreateTeamDto):Promise<CreateTeamResponseDto> {
     return  this.teamsService.create(user, createTeamDto);
  }

  @Get()
  @TeamRoles(TeamRole.TeamMemberEditor)
  @UseGuards(TeamRolesGuard)
  findAll(@GetUser() user) {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
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
