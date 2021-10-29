import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { CreateCollectionDto } from 'src/dto/create-collection-dto';
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

  @Post()
  createCollection(@Body() createCollectionDto: CreateCollectionDto) : Promise<Collection> {
      return this.collectionService.createCollection(createCollectionDto);
  }
  
  @ApiParam({name: 'name', required: true, description: 'Collection\'s name'})
  @Get('/:name/rating')
  getRating(@Param() params)
  {
      return this.collectionService.computeNftRating(params.name);
  }
}