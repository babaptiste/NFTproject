import { Injectable, Inject } from '@nestjs/common';
import { Team } from 'src/entity/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TEAMS_REPOSITORY')
    private teamsRepository: typeof Team
  ) {}

  // Get all teams.
  async findAll(): Promise<Team[]> {
    return this.teamsRepository.findAll<Team>();
  }

  // Create a team.
  async createTeam(name): Promise<Team> {
    return this.teamsRepository.create({ name: name });
  }

  // Update balance
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

  // Get best seller team.
  async findBestSeller(): Promise<Team> {
    var l = await this.teamsRepository.findAll<Team>();

    l.sort(function (a, b) {
      return a.numberOfSales - b.numberOfSales;
    })

    return l[l.length - 1]
  }
}