import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { UpdateNftDto } from 'src/dto/update-nft-dto';
import { Nft } from 'src/entity/nft.entity';
import { NftService } from 'src/service/nft.service';
import { CreateNftDto } from 'src/dto/create-nft-dto';
import { UpdateRatingDto } from 'src/dto/update-rating-dto';

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

  @Put('/rating')
  addRating(@Body() updateRatingDto : UpdateRatingDto) : Promise<Nft>
  {
      return this.nftService.addRating(updateRatingDto);
  }
}