import { Injectable } from '@nestjs/common';
import { dataSource } from 'ormconfig';
import { Question } from 'src/domain/question/question.entity';
import { QuestionDto } from './dto/question.dto';
import { Exam } from 'src/domain/exam/exam.entity';

@Injectable()
export class questionService {
  questionRepository = dataSource.getRepository(Question);
  examRepository = dataSource.getRepository(Exam);

  createQuestion = async (
    question: QuestionDto,
    exam_id: number,
  ): Promise<QuestionDto> => {
    const exam = await this.examRepository.findOne({
      where: {
        id: exam_id,
      },
      relations: {
        questions: true,
      },
    });
    exam.questions.push(question);
    const new_question = await this.questionRepository.save(question);
    return new_question;
  };

  getQuestions = async (id: number): Promise<Question[]> => {
    const questions = await this.questionRepository.find({
      relations: ['exams'],
      where: {
        exams: {
          id: id,
        },
      },
    });
    return questions;
  };
}
