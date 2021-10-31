import { Controller, Get, HttpCode, Post, Req, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  //@UseGuards(JwtAuthGuard)
  findAll() : Promise<Team[]>{
    return this.teamService.findAll();
  }

  @ApiParam({name: 'name', required: true, description: 'name of the team'})
  @Post('/:name')
  //@UseGuards(JwtAuthGuard)
  createTeam(@Param() params) : Promise<Team>{
      return this.teamService.createTeam(params.name);
  }


  @Put('/balance')
  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.Admin)
  updateBalance(@Body() updateTeamBalanceDto : UpdateTeamBalanceDto)
  {
      return this.teamService.updateBalance(updateTeamBalanceDto.id, updateTeamBalanceDto.balance);
  }

  @Get('/bestseller')
  bestSellerTeam() : Promise<Team>{
    return this.teamService.findBestSeller();
  }
}