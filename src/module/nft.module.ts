import { Module } from '@nestjs/common';
import { NftController } from 'src/controller/nft.controller';
import { NftService } from 'src/service/nft.service';
import { nftProviders } from 'src/provider/nft.providers';
import { DatabaseModule } from 'src/module/database.module';
import { teamsProviders } from 'src/provider/teams.providers';
import { TeamsModule } from './teams.module';
import { UsersModule } from './users.module';
import { usersProviders } from 'src/provider/users.providers';
import { collectionProviders } from 'src/provider/collection.providers';

@Module({
  imports: [DatabaseModule, UsersModule, TeamsModule],
  controllers: [NftController],
  providers: [
    NftService,
    ...nftProviders,
    ...usersProviders,
    ...teamsProviders,
    ...collectionProviders
  ],
})
export class NftModule {}