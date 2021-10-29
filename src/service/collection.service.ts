import { Injectable, Inject } from '@nestjs/common';
import { Collection } from 'src/entity/collection.entity';
import { Nft } from 'src/entity/nft.entity'

@Injectable()
export class CollectionService {
  constructor(
    @Inject('COLLECTION_REPOSITORY')
    private CollectionRepository: typeof Collection,
    @Inject('NFT_REPOSITORY')
    private NftRepository: typeof Nft
  ) {}

  async createCollection(name): Promise<Collection> {
    return this.CollectionRepository.create({ name: name });
  }

  async findAll(): Promise<Collection[]> {
    return this.CollectionRepository.findAll<Collection>();
  }

  async updateStatus(name,status) : Promise<Collection> {
    await this.CollectionRepository.update({ status: status },
      {
          where: {
              name : name
          }
      });
    return this.CollectionRepository.findOne({
        where: {
            name : name
        }
    });
  }

  async computeNftRating(collectionName) : Promise<number> {
    var list = await this.NftRepository.findAll({
        where: {
            belongToCollection : collectionName
        }

    });
    var total = 0
    var i = 0
    list.forEach(element => {
        total += element.rating
        i += 1
    });
    var moy = total / i

    return moy
    
    /*await this.CollectionRepository.update({ rating : moy},
        {
            where: {
                name : collectionName
            }
        })

    return this.CollectionRepository.findOne({
        where: {
            name : collectionName
        }
    });*/
  }


}