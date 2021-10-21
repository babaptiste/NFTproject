import { Module } from '@nestjs/common';
import { TeamsController } from 'src/controller/teams.controller';
import { TeamsService } from 'src/service/teams.service';
import { teamsProviders } from 'src/provider/teams.providers';
import { DatabaseModule } from 'src/module/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    ...teamsProviders,
  ],
})
export class TeamsModule {}