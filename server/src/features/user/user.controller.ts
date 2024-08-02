import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { UserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get('getusers')
  async getusers() {
    return await this.userservice.getusers();
  }

  @Post('createuser')
  async createUser(@Body() body: UserDto) {
    const user = await this.userservice.createUser(body);
    return user;
  }
}
