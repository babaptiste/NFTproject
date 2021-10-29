import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { CreateCollectionDto } from 'src/dto/create-collection-dto';
import { UpdateNftDto } from 'src/dto/update-nft-dto';
import { Collection } from 'src/entity/collection.entity';
import { CollectionService } from 'src/service/collection.service';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
constructor(private collectionService: CollectionService) {}

  @Get()
  findAll() : Promise<Collection[]>{
    return this.collectionService.findAll();
  }

  @ApiParam({name: 'name', required: true, description: 'Collection\'s name'})
  @Post('/:name')
  createCollection(@Param() params) : Promise<Collection> {
      return this.collectionService.createCollection(params.name);
  }
  
  @ApiParam({name: 'name', required: true, description: 'Collection\'s name'})
  @Get('/rating')
  getRating(@Param() params)
  {
      return this.collectionService.computeNftRating(params.collectionName);
  }
}