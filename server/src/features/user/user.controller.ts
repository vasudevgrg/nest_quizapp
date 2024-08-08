import { Controller, Get, Post, Body, Redirect, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { LoginDto, UserDto } from './dto/create-user.dto';
import { dataSource } from 'ormconfig';
import { User } from 'src/domain/user/user.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get('getusers')
  async getusers() {
    return await this.userservice.getusers();
  }

  @Post('createuser')
  // @Redirect('http://localhost:3000/login')
  async createUser(@Body() body: UserDto): Promise<User> {
    const user = await this.userservice.createUser(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { email, password } = body;

    const user = await this.userservice.login({ email, password });

    if (user) {
      console.log(user);
      const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET_KEY);
      res.cookie('jwt', token, {
        secure: false,
      });
      res.cookie('user_id', user.id, {
        secure: false,
      });
      return res.send(true);
    } else {
      return res.send(false);
    }
  }
}
