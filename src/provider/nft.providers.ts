import { Nft } from "src/entity/nft.entity";

export const nftProviders = [
    {
      provide: 'NFT_REPOSITORY',
      useValue: Nft,
    },
  ];