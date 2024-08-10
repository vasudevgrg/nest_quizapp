import {
  Controller,
  Get,
  Post,
  Body,
  Redirect,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { LoginDto, UserDto } from './dto/create-user.dto';
import { dataSource } from 'ormconfig';
import { User } from 'src/domain/user/user.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { examService } from '../exam/exam.service';
dotenv.config();

@Controller('user')
export class UserController {
  constructor(
    private readonly userservice: UserService,
    private readonly examService: examService,
    private readonly configService: ConfigService,
  ) {}

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
      console.log(process.env.JWT_SECRET_KEY);
      const token = jwt.sign(
        { role: user.role },
        this.configService.get<'string'>('JWT_SECRET_KEY'),
      );
      res.cookie('jwt', token, {
        secure: false,
      });
      res.cookie('user', user,{
        secure: false
      });
      res.cookie('user_id', user.id, {
        secure: false,
      });
      res.cookie('role', user.role, {
        secure: false,
      });
      return res.send(true);
    } else {
      return res.send(false);
    }
  }

  @Get('getattemptedexams')
  async getAttemptedExams(@Req() req: Request) {
    const exams = await this.examService.getAtemptedExams({
      user_id: req.cookies['user_id'],
    });
    return exams;
  }
}
