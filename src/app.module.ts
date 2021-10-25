import { Module } from '@nestjs/common';
import { TeamsModule } from './module/teams.module';
import { UsersModule } from './module/users.module';
import { NftModule } from './module/nft.module';
import { CollectionModule } from './module/collection.module';

@Module({
  imports: [UsersModule, TeamsModule, NftModule, CollectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
