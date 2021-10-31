import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Nft } from "src/entity/nft.entity";
import { UpdateNftDto } from 'src/dto/update-nft-dto'
import { Team } from "src/entity/team.entity";
import { User } from "src/entity/user.entity";
import { Collection } from "src/entity/collection.entity";
import { validate } from "class-validator";


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

    async validate(sellNftDto){
        /* Nft */        
        try {
            var nft = await this.nftsRepository.findOne({ where: { id: sellNftDto.id } })
        } catch (error) {
            throw new HttpException('Nft doesn\'t exist', HttpStatus.BAD_REQUEST);
        }
        if (nft.history == [] || nft.history == null || nft.price == null)
            throw new HttpException('Nft doesn\'t belong to anyone', HttpStatus.BAD_REQUEST);
        
        if (nft.belongToCollection == null)
            throw new HttpException('Nft doesn\'t belong to a collection', HttpStatus.BAD_REQUEST);
          
        /* Users */
        var oldUser = await this.usersRepository.findOne({
            where: {
                name: nft.history[nft.history.length - 1]
            }
        })
        if (oldUser == null)
            throw new HttpException('Nft doesn\'t belong to a registered user', HttpStatus.BAD_REQUEST);
        else if (oldUser.teamId == null)
            throw new HttpException('Nft doesn\'t belong to a registered user', HttpStatus.BAD_REQUEST);

        var newUser = await this.usersRepository.findOne({
            where: {
                name: sellNftDto.owner
            }
        })

        if (newUser == null)
            throw new HttpException('Nft doesn\'t belong to a registered user', HttpStatus.BAD_REQUEST);


        /* Collection */

        var collection = this.collectionRepository.findOne({
            where: {
                name: nft.belongToCollection
            }
        })
        if (collection == null)
            throw new HttpException('Nft\'s collection doesn\'t exist', HttpStatus.BAD_REQUEST);

    
        /* Team */
        
        var oldTeam = this.teamsRepository.findOne({
            where: {
                id: oldUser.teamId
            }
        })

        if (oldTeam == null || (await oldTeam).balance == null)
            throw new HttpException('Previous owner\'s team doesn\'t exist', HttpStatus.BAD_REQUEST);
            
        
        var newTeam = this.teamsRepository.findOne({
            where: {
                id: newUser.teamId
            }
        })

        if (newTeam == null || (await newTeam).balance == null)
            throw new HttpException('New owner\'s team doesn\'t exist', HttpStatus.BAD_REQUEST);
    }

    async sellNft(sellNftDto): Promise<Nft> {

        validate(sellNftDto);
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
        
        var date = new Date()
        var datetext = date.toTimeString()
        this.logger.log("New sell at: " + datetext + " from " + oldUser.name + " to " + newUser.name + " of NFT n° " + nft.id)
        return this.nftsRepository.findOne({
        where: {
            id: sellNftDto.id
        }
        });        
    }
}