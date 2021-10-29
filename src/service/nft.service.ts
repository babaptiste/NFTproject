import { Inject, Injectable } from "@nestjs/common";
import { Nft } from "src/entity/nft.entity";
import {UpdateNftDto} from 'src/dto/update-nft-dto'

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
                history: [createNftDto.history],
                belongToCollection: createNftDto.belongToCollection,
                rating : createNftDto.rating,
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


    async updateOwners(updateNftDto) : Promise<Nft> {
        return await this.nftsRepository.findOne({
            where: {
                name: updateNftDto.name
            }
        }).then((curr) => {
            if (curr.history == null)
            {
                curr.history = []
            }
            curr.history.push(updateNftDto.owner)
            return curr.save()
        })
    }
    // TODO history of owner : add last owner to the list

    async addRating(UpdateRatingDto) : Promise<Nft> {
        await this.nftsRepository.update({ rating: UpdateRatingDto.rating},
            {
                where: {
                    id: UpdateRatingDto.id
                }
            });
            return this.nftsRepository.findOne({
                where: {
                    id: UpdateRatingDto.id
                }
            })
    }
}