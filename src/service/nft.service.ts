import { Inject, Injectable, Logger } from "@nestjs/common";
import { Nft } from "src/entity/nft.entity";
import { UpdateNftDto } from 'src/dto/update-nft-dto'
import { Team } from "src/entity/team.entity";
import { User } from "src/entity/user.entity";
import { Collection } from "src/entity/collection.entity";


@Injectable()
export class NftService {
    constructor(
        @Inject('NFT_REPOSITORY')
        private nftsRepository: typeof Nft,
        @Inject('TEAMS_REPOSITORY')
        private teamsRepository: typeof Team,
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        @Inject('COLLECTION_REPOSITORY')
        private collectionRepository: typeof Collection
      ) {}

    private readonly logger = new Logger(NftService.name);

    async register(createNftDto): Promise<Nft> {
        return await this.nftsRepository.create(
            {
                name: createNftDto.name,
                image: createNftDto.image,
                price: createNftDto.price,
                status: createNftDto.status,
                history: createNftDto.history,
                belongToCollection: createNftDto.belongToCollection,
                rating : createNftDto.rating,
            });
    }

    /* Returns all Nfts */
    async findAll(): Promise<Nft[]> 
    {
        return this.nftsRepository.findAll<Nft>();
    }

    /* Add a Nft To a collection */

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

    /* Add a new owner to the history list */
    async updateOwners(updateNftDto): Promise<Nft> {
        const foundItem = await this.nftsRepository.findOne({ where: { id: updateNftDto.id } })
        var newhistory = foundItem.history
        if (newhistory == null)
            newhistory = []
        newhistory.push(updateNftDto.owner)
        await this.nftsRepository.update({ history: newhistory }, { where: { id: updateNftDto.id } })
        return this.nftsRepository.findOne({
            where: {
                id: updateNftDto.id
            }
        });
    }

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

    /* Find the nft with the highest rating*/

    async findMostRated(): Promise<Nft> {
        var l = await this.nftsRepository.findAll<Nft>();

        l.sort(function (a, b) {
            return a.rating - b.rating;
        })

        return l[l.length - 1]
    }

    async sellNft(sellNftDto): Promise<Nft> {

        /* Find first owner team and Update balance and update number of sales in team + collection*/
        
        var nft = await this.nftsRepository.findOne({ where: { id: sellNftDto.id } })
        var oldUser = await this.usersRepository.findOne({
            where: {
                name: nft.history[nft.history.length - 1]
            }
        })

        var oldTeam = this.teamsRepository.findOne({
            where: {
                id: oldUser.teamId
            }
        })

        var collection = this.collectionRepository.findOne({
            where: {
                name: nft.belongToCollection
            }
        })

        var newBalance = (await oldTeam).balance
        newBalance === null ? 1 : newBalance + nft.price
        
        var newSalesnumber = (await oldTeam).numberOfSales
        newSalesnumber === null ? 1 : newSalesnumber + 1

        await this.teamsRepository.update({ balance: newBalance, numberOfSales: newSalesnumber},
        {
          where: {
              id: oldUser.teamId
          }
        });
        
        var newSalesCollection = (await collection).numberOfSales
        newSalesCollection === null ? 1 : newSalesCollection + 1
        
        await this.collectionRepository.update({ numberOfSales: newSalesCollection},
        {
            where: {
                id: (await collection).id
            }
        });

        /* Update nft owner*/

        var newNft = await this.updateOwners(sellNftDto)
           
        /* Find new owner and update balance*/
        var newUser = await this.usersRepository.findOne({
            where: {
                name: sellNftDto.owner
            }
        })


        var team = this.teamsRepository.findOne({
            where: {
                id: newUser.teamId
            }
        })

        newBalance = (await team).balance - newNft.price

        await this.teamsRepository.update({ balance: newBalance},
        {
          where: {
              id: newUser.teamId
          }
        });
        
        await this.nftsRepository.update({date: Date.now()},
        {
            where: {
                id: sellNftDto.id
            } 
        });

        this.logger.log("New sell at: " + Date.now() + "from " + oldUser.name + " to " + newUser.name + " of NFT n° " + nft.id)
        return this.nftsRepository.findOne({
        where: {
            id: sellNftDto.id
        }
        });        
    }

    async getLastSells(number): Promise<Nft[]> {
        return await this.nftsRepository.findAll({
            limit: number,
            order:[
                ['date', 'DESC']
            ]
        })
    }

    async getOwner(owner): Promise<Nft[]> {
        const { Op } = require("sequelize");
        var nfts  = await this.nftsRepository.findAll();
        var arr = []
        nfts.forEach(element => {
            if (element.history[element.history.length - 1] ==  owner)
            {
                arr.push(element);
            }
        });
        return arr;
    }
}