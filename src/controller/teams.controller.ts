import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateTeamBalanceDto } from 'src/dto/update-team-balance.dto';
import { Team } from 'src/entity/team.entity';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { TeamsService } from 'src/service/teams.service';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
constructor(private teamService: TeamsService) {}

  @Get()
  findAll() : Promise<Team[]>{
    return this.teamService.findAll();
  }

  @ApiParam({name: 'name', required: true, description: 'name of the team'})
  @Post('/:name')
  createTeam(@Param() params) : Promise<Team>{
      return this.teamService.createTeam(params.name);
  }


  @Put('/balance')
  //@Roles(Role.Admin)
  updateBalance(@Body() updateTeamBalanceDto : UpdateTeamBalanceDto)
  {
      return this.teamService.updateBalance(updateTeamBalanceDto.id, updateTeamBalanceDto.balance);
  }
}