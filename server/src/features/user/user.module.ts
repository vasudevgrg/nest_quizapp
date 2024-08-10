import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { examService } from '../exam/exam.service';
import { questionService } from '../question/question.service';
import { OptionService } from '../option/option.service';

@Module({
  controllers: [UserController],
  providers: [UserService, examService, questionService, OptionService],
})
export class UserModule {}
