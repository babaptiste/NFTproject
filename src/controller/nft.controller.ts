import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { Nft } from 'src/entity/nft.entity';
import {UpdateNftDto} from 'src/dto/update-nft-dto'
import { NftService } from 'src/service/nft.service';
import { CreateNftDto } from 'src/dto/create-nft-dto';
import { UpdateRatingDto } from 'src/dto/update-rating-dto';
import { SellNftDto } from 'src/dto/sell-nft-dto';

@ApiTags('nft')
@Controller('nft')
export class NftController {
constructor(private nftService: NftService) {}

  @Post()
  // Create a new nft 
  createNft(@Body() createNftDto : CreateNftDto) : Promise<Nft>{
      return this.nftService.register(createNftDto);
  }

  @Get()
  // Get every existing nft 
  findall(): Promise<Nft[]>{
    return this.nftService.findAll();
  }


  @Put('/owner')
  // Add owner to a nft 
  addOwner(@Body() updateNftDto : UpdateNftDto) : Promise<Nft>
  {
      return this.nftService.updateOwners(updateNftDto);
  }

  /*
    id : Nft's ID
    owner : name of the new owner
  */
  
  @Put('/sell')
  // Sell a nft with :id as his id to :owner
  sellNft(@Body() sellNftDto: SellNftDto) : Promise<Nft>
  {
    return this.nftService.sellNft(sellNftDto);
  }

  @Put('/rating')
  // Add a rating to a nft
  addRating(@Body() updateRatingDto : UpdateRatingDto) : Promise<Nft>
  {
      return this.nftService.addRating(updateRatingDto);
  }

  @Get('/mostrated')
  // Find the best rated nft  
  findMostRated(): Promise<Nft>{
    return this.nftService.findMostRated();
  }

  @ApiParam({name: 'number', required: true, description: 'Last number sells'})
  @Get('/last/:number')
  // Get X last sells
  getLastSells(@Param() params) : Promise<Nft[]>{
      return this.nftService.getLastSells(params.number);
  }

  @ApiParam({name: 'owner', required: true, description: 'Owner name'})
  @Get('/:owner')
  //Get every nfts of a owner
  getOwner(@Param() params) : Promise<Nft[]>{
      return this.nftService.getOwner(params.owner);
  }
}