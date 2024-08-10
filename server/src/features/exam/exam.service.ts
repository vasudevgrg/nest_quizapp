import { Injectable } from '@nestjs/common';

import { Exam } from 'src/domain/exam/exam.entity';
import { CreateExamDto, ExamDto } from './dto/exam.dto';
import { User } from 'src/domain/user/user.entity';
import { Question } from 'src/domain/question/question.entity';
import { StudentExam } from 'src/domain/student_exam/student_exam.entity';
import { questionService } from '../question/question.service';
import { dataSource } from 'ormconfig';
import { StudentQuestion } from 'src/domain/student_question/student_question.entity';

@Injectable()
export class examService {
  constructor(private readonly questionService: questionService) {}

  createExam = async (exam: CreateExamDto) => {
    const { name, user_id } = exam;
    (user_id);
    const newExam = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Exam)
      .values([{ name }])
      .returning('*')
      .execute();

    await dataSource
      .createQueryBuilder()
      .relation(User, 'exams')
      .of(user_id)
      .add(newExam.raw[0].id);

    return newExam.raw[0];
  };

  getExams = async (user_id: number): Promise<Array<ExamDto>> => {
    const exams = await dataSource
      .createQueryBuilder()
      .select('exam')
      .from(Exam, 'exam')
      .leftJoinAndSelect('exam.questions', 'question')
      .leftJoinAndSelect('question.options', 'option')
      .where('exam.userId= :user_id', { user_id })
      .getMany();
    return exams;
  };

  async attemptExam({ exam_id, user_id }) {
    try {

      const val = await dataSource
        .createQueryBuilder()
        .insert()
        .into(StudentExam)
        .values([{ student_id: user_id, exam_id: exam_id }])
        .returning('*')
        .execute();

      console.log(val.raw[0]);
      return val.raw[0].id;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async submitExam({ attemptedQuestions, student_exam_id, user_id }) {
    let score = 0;

    try {
      await Promise.all(
        attemptedQuestions.map(async (attemptedQuestion) => {
          const { question_id, option_id } = attemptedQuestion;
          const val =
            await this.questionService.calculateScore(attemptedQuestion);
          if (val) {
            score++;
          }
          await this.questionService.addAttemptedQuestion({
            question_id,
            option_id,
            user_id,
            student_exam_id,
          });
        }),
      );

      await dataSource
        .createQueryBuilder()
        .update(StudentExam)
        .set({ score: score })
        .where('id= :id', { id: student_exam_id })
        .execute();

      return score;
    } catch (error) {
      console.log(error);
    }
  }

  async getAtemptedExams({ user_id }) {
    const result = await dataSource
      .createQueryBuilder()
      .select('student_exam')
      .from(StudentExam, 'student_exam')
      .where('student_exam.student_id= :id', { id: user_id })
      .getMany();
    return result;
  }

  async getExamDetails({ exam_id }) {
    const exam = await dataSource
      .createQueryBuilder()
      .select('exam')
      .from(Exam, 'exam')
      .where('exam.id=:id', { id: exam_id })
      .getOne();
    return exam;
  }

  async getQuestions({ exam_id }) {
    const questions = await dataSource
      .createQueryBuilder()
      .relation(Exam, 'questions')
      .of(exam_id)
      .loadMany();

    for (const question of questions) {
      question.options = await dataSource
        .createQueryBuilder()
        .relation(Question, 'options')
        .of(question.id)
        .loadMany();
    }
    return questions;
  }

  async getSelectedOption({ question_id, student_exam_id, user_id }: { question_id: number, student_exam_id: number, user_id: number }) {
    const studentOption = await dataSource
      .createQueryBuilder()
      .select('student_question')
      .from(StudentQuestion, 'student_question')
      .where(
        'student_question.question_id= :question_id AND student_question.student_exam_id= :student_exam_id AND user_id= :user_id',
        { question_id, student_exam_id, user_id },
      )
      .getOne();
      return studentOption.id;
  };

  async addQuestion ({question_id, exam_id}) {
    try{
      await dataSource.createQueryBuilder().relation(Exam, 'questions').of(exam_id).add(question_id);
      return true;
    }catch(error) {
      console.log(error);
      return false;
    }
  }
  
}
