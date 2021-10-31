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
  // Return every collection
  findAll() : Promise<Collection[]>{
    return this.collectionService.findAll();
  }

  @Post()
  // Create a new collection  
  createCollection(@Body() createCollectionDto: CreateCollectionDto) : Promise<Collection> {
      return this.collectionService.createCollection(createCollectionDto);
  }
  
  @ApiParam({name: 'name', required: true, description: 'Collection\'s name'})
  @Get('/:name/rating')
  // Get the average rating of a collection  
  getRating(@Param() params)
  {
      return this.collectionService.computeNftRating(params.name);
  }

  @Get('/bestseller')
  // Get the best selling collection
  getbestseller() : Promise<Collection> {
    return this.collectionService.findBestSeller();
  }
}