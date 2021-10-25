import { Module } from '@nestjs/common';
import { CollectionController } from 'src/controller/collection.controller';
import { CollectionService } from 'src/service/collection.service';
import { collectionProviders } from 'src/provider/collection.providers';
import { DatabaseModule } from 'src/module/database.module';
import { NftModule } from './nft.module';
import { nftProviders } from 'src/provider/nft.providers';

@Module({
  imports: [DatabaseModule, NftModule],
  controllers: [CollectionController],
  providers: [
    CollectionService,
      ...collectionProviders,
      ...nftProviders
  ],
})
export class CollectionModule {}