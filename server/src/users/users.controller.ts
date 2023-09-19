import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
