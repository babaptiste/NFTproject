import { Controller, Get, HttpCode, Post, Req, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTeamBalanceDto } from 'src/dto/update-team-balance.dto';
import { Team } from 'src/entity/team.entity';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { TeamsService } from 'src/service/teams.service';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
constructor(private teamService: TeamsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // Get request for all teams.
  findAll() : Promise<Team[]>{
    return this.teamService.findAll();
  }

  @ApiParam({name: 'name', required: true, description: 'name of the team'})
  @Post('/:name')
  @UseGuards(JwtAuthGuard)
  // Post request to create a team.
  createTeam(@Param() params) : Promise<Team>{
      return this.teamService.createTeam(params.name);
  }


  @Put('/balance')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // Put request to update balance for a team.
  updateBalance(@Body() updateTeamBalanceDto : UpdateTeamBalanceDto)
  {
      return this.teamService.updateBalance(updateTeamBalanceDto.id, updateTeamBalanceDto.balance);
  }

  @Get('/bestseller')
  // Get request for the best seller team.
  bestSellerTeam() : Promise<Team>{
    return this.teamService.findBestSeller();
  }
}