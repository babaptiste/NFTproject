import { Injectable, Inject } from '@nestjs/common';
import { Team } from 'src/entity/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAMS_REPOSITORY')
    private teamsRepository: typeof Team
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamsRepository.findAll<Team>();
  }

  async createTeam(name): Promise<Team> {
    return this.teamsRepository.create({ name: name });
  }

  async updateBalance(id, balance) : Promise<Team> {
    await this.teamsRepository.update({ balance: balance },
      {
          where: {
              id: id
          }
      });
    return this.teamsRepository.findOne({
        where: {
            id: id
        }
    });
  }
}