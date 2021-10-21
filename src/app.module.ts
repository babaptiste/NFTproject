import { Module } from '@nestjs/common';
import { TeamsModule } from './module/teams.module';
import { UsersModule } from './module/users.module';

@Module({
  imports: [UsersModule, TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
