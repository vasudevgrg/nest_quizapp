import { Controller, Res, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { userInterface } from './Interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get('getusers')
  async getusers(@Res() res: Response) {
    return res.send({ users: await this.userservice.getusers() });
  }

  @Post('createuser')
  async createUser(@Body() body: userInterface, @Res() res: Response) {
    const user= await this.userservice.createUser(body);
  }
}
