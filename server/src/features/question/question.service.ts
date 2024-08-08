import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { dataSource } from 'ormconfig';
import { Question } from 'src/domain/question/question.entity';
import { createQuestionDto, returnCreateQuestionDto } from './dto/question.dto';
import { Exam } from 'src/domain/exam/exam.entity';
import { OptionService } from '../option/option.service';
import { StudentQuestion } from 'src/domain/student_question/student_question.entity';

@Injectable()
export class questionService {
  constructor(private readonly optionService: OptionService) {}

  questionRepository = dataSource.getRepository(Question);
  examRepository = dataSource.getRepository(Exam);

  createQuestion = async ({
    name,
    statement,
    exam_id,
    options,
    correct_option,
  }: createQuestionDto): Promise<returnCreateQuestionDto> => {
    try {
      const insertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values([{ name, statement }])
        .returning('*')
        .execute();

      const question = insertResult.raw[0];

      await dataSource
        .createQueryBuilder()
        .relation(Exam, 'questions')
        .of(exam_id)
        .add(question.id);

      await Promise.all(
        options.map(async (option: string) => {
          await this.optionService.addOption({
            option: option,
            question_id: question.id,
          });
        }),
      );

      const option = await this.optionService.getOption({
        option: correct_option,
        question_id: question.id,
      });

      await dataSource
        .createQueryBuilder()
        .update(Question)
        .set({ correct_option_id: option.id })
        .where('id= :id', {
          id: question.id,
        })
        .execute();

      const newQuestion = await dataSource
        .createQueryBuilder()
        .select('question')
        .from(Question, 'question')
        .leftJoinAndSelect('question.options', 'options')
        .where('question.id = :id', { id: question.id })
        .getOne();

      return newQuestion as returnCreateQuestionDto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create question');
    }
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

  addAttemptedQuestion = async ({
    question_id,
    user_id,
    option_id,
    student_exam_id,
  }) => {
    const student_question = await dataSource
      .createQueryBuilder()
      .insert()
      .into(StudentQuestion)
      .values([{ question_id, user_id, student_exam_id }])
      .returning('*')
      .execute();
    await dataSource
      .createQueryBuilder()
      .relation(StudentQuestion, 'option')
      .of(student_question.raw[0].id)
      .set(option_id);
  };

  calculateScore = async ({ question_id, option_id }): Promise<boolean> => {
    const question = await dataSource
      .createQueryBuilder()
      .select('question')
      .from(Question, 'question')
      .where('question.id=: id', { id: question_id })
      .getOne();
    console.log(question);

    if (question.correct_option_id === option_id) {
      return true;
    } else {
      return false;
    }
  };
}
