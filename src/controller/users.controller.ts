import { Controller, Get, HttpCode, Post, Req, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/service/users.service';

@Controller('users')
export class UsersController {
constructor(private userService: UsersService) {}
  @Post()
  @HttpCode(204)
  register(@Body() createUserDto: CreateUserDto): string {
    return this.userService.register(createUserDto);
  }
}