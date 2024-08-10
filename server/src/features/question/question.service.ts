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
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    console.log(correct_option);

    try {
      const insertResult = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values([{ name, statement }])
        .returning('*')
        .execute();

      const question = insertResult.raw[0];

      await queryRunner.manager
        .createQueryBuilder()
        .relation(Exam, 'questions')
        .of(exam_id)
        .add(question.id);

      await Promise.all(
        options.map(async (option: string) => {
          await this.optionService.addOption(
            {
              option: option,
              question_id: question.id,
            },
            queryRunner,
          );
        }),
      );

      const option = await this.optionService.getOption(
        {
          option: correct_option,
          question_id: question.id,
        },
        queryRunner,
      );

      console.log(option);

      await queryRunner.manager
        .createQueryBuilder()
        .update(Question)
        .set({ correct_option_id: option.id })
        .where('id= :id', {
          id: question.id,
        })
        .execute();

      const newQuestion = await queryRunner.manager
        .createQueryBuilder(queryRunner)
        .select('question')
        .from(Question, 'question')
        .leftJoinAndSelect('question.options', 'options')
        .where('question.id = :id', { id: question.id })
        .getOne();

      await queryRunner.commitTransaction();

      return newQuestion as returnCreateQuestionDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new InternalServerErrorException('Failed to create question');
    } finally {
      await queryRunner.release();
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
    try {
      const question = await dataSource
        .createQueryBuilder()
        .select('question')
        .from(Question, 'question')
        .where('question.id=:id', { id: question_id })
        .getOne();

      if (question.correct_option_id === option_id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error, 'vasudev');
      throw new Error(error);
    }
  };

  async searchQuestions({ name }) {
    const questions = await dataSource
      .createQueryBuilder()
      .select('question')
      .from(Question, 'question')
      .where('question.name ILIKE :name', { name: `%${name}%` })
      .limit(3)
      .getMany();
    return questions;
  }

  async searchRelation({
    question_id,
    exam_id,
  }: {
    question_id: number;
    exam_id: number;
  }): Promise<boolean> {
    const relation = await dataSource
      .getRepository(Question)
      .createQueryBuilder('question')
      .leftJoin('question.exams', 'exam')
      .where('question.id = :question_id', { question_id })
      .andWhere('exam.id = :exam_id', { exam_id })
      .getOne();

    return !!relation;
  }
}
