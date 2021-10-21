import { Team } from "src/entity/team.entity";

export const teamsProviders = [
    {
      provide: 'TEAMS_REPOSITORY',
      useValue: Team,
    },
  ];