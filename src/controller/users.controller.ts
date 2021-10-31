import { Controller, Get, HttpCode, Post, Req, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateRoleDto } from 'src/dto/update-role-dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/service/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
constructor(private userService: UsersService) {}
  @Post()
  register(@Body() createUserDto: CreateUserDto) : Promise<User>{
    return this.userService.register(createUserDto);
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  findAll() : Promise<User[]>{
    return this.userService.findAll();
  }

  @Put('/team')
  //@UseGuards(JwtAuthGuard)
  addMember(@Body() updateUserDto: UpdateUserDto) : Promise<User>{
      return this.userService.addMember(updateUserDto);
  }

  @Put('/role')
  addRole(@Body() updateRoleDto: UpdateRoleDto): Promise<User>{
    return this.userService.addRole(updateRoleDto);
  }

}