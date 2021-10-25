import { Module } from '@nestjs/common';
import { NftController } from 'src/controller/nft.controller';
import { NftService } from 'src/service/nft.service';
import { nftProviders } from 'src/provider/nft.providers';
import { DatabaseModule } from 'src/module/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NftController],
  providers: [
    NftService,
    ...nftProviders,
  ],
})
export class NftModule {}