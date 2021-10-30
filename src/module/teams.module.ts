import { Module } from '@nestjs/common';
import { TeamsController } from 'src/controller/teams.controller';
import { TeamsService } from 'src/service/teams.service';
import { teamsProviders } from 'src/provider/teams.providers';
import { DatabaseModule } from 'src/module/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/role/roles.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    ...teamsProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class TeamsModule {}