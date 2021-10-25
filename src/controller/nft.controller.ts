import { Controller, Get, HttpCode, Post, Req, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IntegerDataType } from 'sequelize/types';
import { UpdateNftDto } from 'src/dto/update-nft-dto';
import { Nft } from 'src/entity/nft.entity';
import { NftService } from 'src/service/nft.service';

@ApiTags('nft')
@Controller('nft')
export class NftController {
constructor(private nftService: NftService) {}

 
@ApiParam({name: 'name', required: true, description: 'name of the nft'})
@Post('/:name')
createNft(@Param() params) : Promise<Nft>{
    return this.nftService.register(params.name);
}



  @Put('/balance')
  updateBalance(@Body() updateNftOwnerDto : UpdateNftDto)
  {
      return this.nftService.updateOwners(updateNftOwnerDto.history);
  }
}