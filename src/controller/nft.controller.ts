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
  createNft(@Body() createNftDto : CreateNftDto) : Promise<Nft>{
      return this.nftService.register(createNftDto);
  }

  @Get()
  findall(): Promise<Nft[]>{
    return this.nftService.findAll();
  }

  @Put('/owner')
  addOwner(@Body() updateNftDto : UpdateNftDto) : Promise<Nft>
  {
      return this.nftService.updateOwners(updateNftDto);
  }

  @Put('/sell')
  sellNft(@Body() sellNftDto: SellNftDto) : Promise<Nft>
  {
    return this.nftService.sellNft(sellNftDto);
  }

  @Put('/rating')
  addRating(@Body() updateRatingDto : UpdateRatingDto) : Promise<Nft>
  {
      return this.nftService.addRating(updateRatingDto);
  }

  @Get('/mostrated')
  findMostRated(): Promise<Nft>{
    return this.nftService.findMostRated();
  }

  @ApiParam({name: 'number', required: true, description: 'Last number sells'})
  @Get('/last/:number')
  getLastSells(@Param() params) : Promise<Nft[]>{
      return this.nftService.getLastSells(params.number);
  }

  @ApiParam({name: 'owner', required: true, description: 'Owner name'})
  @Get('/:owner')
  getOwner(@Param() params) : Promise<Nft[]>{
      return this.nftService.getOwner(params.owner);
  }
}