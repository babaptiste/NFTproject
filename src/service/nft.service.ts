import { Inject, Injectable } from "@nestjs/common";
import { UpdateNftDto } from "src/dto/update-nft-dto";
import { Nft } from "src/entity/nft.entity";

@Injectable()
export class NftService {
    constructor(
        @Inject('NFT_REPOSITORY')
        private nftsRepository: typeof Nft,
      ) {}

    async register(createNftDto): Promise<Nft> {
        return await this.nftsRepository.create(
            {
                name: createNftDto.name,
                image: createNftDto.image,
                price: createNftDto.price,
                status: createNftDto.status,
                history: createNftDto.history,
                belongToCollection: createNftDto.belongToCollection,
            });
    }

    async findAll(): Promise<Nft[]> 
    {
        return this.nftsRepository.findAll<Nft>();
    }

    async addMember(UpdateNftDto, collectionName) : Promise<Nft> {
        await this.nftsRepository.update({ belongToCollection: collectionName},
            {
               where: {
                   name: UpdateNftDto.name
               }
            });
        return this.nftsRepository.findOne({
            where: {
                name: UpdateNftDto.name
            }
        });
    }


    async updateOwners(UpdateNftDto) : Promise<Nft> {
        var tmp = history + ' / ' + UpdateNftDto.history
        await this.nftsRepository.update({ history: tmp},
            {
               where: {
                   name: UpdateNftDto.name
               }
            });
        return this.nftsRepository.findOne({
            where: {
                name: UpdateNftDto.name
            }
        });
    }
    // TODO history of owner : add last owner to the list

    async addRating(UpdateRatingDto) : Promise<Nft> {
        await this.nftsRepository.update({ rating: UpdateRatingDto.rating},
            {
                where: {
                    email: UpdateRatingDto.rating
                }
            });
            return this.nftsRepository.findOne({
                where: {
                    email: UpdateRatingDto.email
                }
            })
    }
}