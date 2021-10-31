import { Collection } from "src/entity/collection.entity";

export const collectionProviders = [
    {
      provide: 'COLLECTION_REPOSITORY',
      useValue: Collection,
    },
  ];