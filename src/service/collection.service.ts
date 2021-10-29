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

  async createCollection(createCollectionDto): Promise<Collection> {
    return this.CollectionRepository.create({ name: createCollectionDto.name,
      logo: createCollectionDto.logo,
      status: createCollectionDto.status,
      time : createCollectionDto.time,
      rating : createCollectionDto.rating });
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

  async computeNftRating(collectionName) : Promise<Collection> {
    var list = await this.NftRepository.findAll({
        where: {
            belongToCollection : collectionName
        }

    });
    var total = 0
    var i = 0
    list.forEach(element => {
        if (element.rating != null)
        {
          total += element.rating
          i += 1
        }
        else{
          i += 1
        }
    });
    var moy = total / i
    
    await this.CollectionRepository.update({ rating : String(moy)},
        {
            where: {
                name : collectionName
            }
        })
        return this.CollectionRepository.findOne({
          where: {
              name : collectionName
          }
      });
  }
}