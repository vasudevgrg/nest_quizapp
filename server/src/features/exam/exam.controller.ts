import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateExamDto, SubmitExamDto } from './dto/exam.dto';
import { examService } from './exam.service';
import { returnCreateQuestionDto } from '../question/dto/question.dto';
import { dataSource } from 'ormconfig';
import { Exam } from 'src/domain/exam/exam.entity';
import { Request } from 'express';
import { User } from 'src/domain/user/user.entity';
import { questionService } from '../question/question.service';

@Controller('exam')
export class ExamController {
  constructor(
    private readonly examService: examService
  ) {}
  @Post('createexam')
  async createExam(@Req() req: Request, @Body() body: { name: string }) {
    const { name } = body;
    const user_id = req.cookies['user_id'];
    const exam = await this.examService.createExam({ name: name, user_id });
    console.log(exam);
    return { exam };
  }

  @Get('getexams')
  async getExams(@Req() req: Request) {
    const user_id = req.cookies['user_id'];

    const exams = await this.examService.getExams(user_id);

    return exams;
  }

  @Get('getquestions/:exam_id')
  async getQuestions(
    @Param('exam_id') exam_id: number,
  ): Promise<returnCreateQuestionDto[]> {
    const questions = await dataSource
      .createQueryBuilder()
      .relation(Exam, 'questions')
      .of(exam_id)
      .loadMany();
    return questions;
  }

  @Get('attemptexam/:exam_id')
  async attemptExam(
    @Param('exam_id') exam_id: number,
    @Req() req: Request,
  ): Promise<boolean> {
    const val = await this.examService.attemptExam({
      exam_id: exam_id,
      user_id: req.cookies['user_id'],
    });
    return val;
  }

  @Post('submitexam/:student_exam_id')
  async submitExam(@Req() req: Request,@Body() body : SubmitExamDto, @Param('student_exam_id') student_exam_id: number) {
    const { attemptedQuestions } = body;
    const score = await this.examService.submitExam({
      attemptedQuestions,
      student_exam_id,
      user_id: req.cookies['user_id'],
    });
    return score;
  }
}
