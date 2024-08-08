import { Injectable } from '@nestjs/common';

import { Exam } from 'src/domain/exam/exam.entity';
import { CreateExamDto, ExamDto } from './dto/exam.dto';
import { User } from 'src/domain/user/user.entity';
import { Question } from 'src/domain/question/question.entity';
import { StudentExam } from 'src/domain/student_exam/student_exam.entity';
import { questionService } from '../question/question.service';
import { dataSource } from 'ormconfig';

@Injectable()
export class examService {
  constructor(private readonly questionService: questionService) {}

  createExam = async (exam: CreateExamDto) => {
    const { name, user_id } = exam;
    console.log(user_id);
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
      console.log(exam_id, user_id);
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(StudentExam)
        .values([{ student_id: user_id, exam_id: exam_id }])
        .execute();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async submitExam({attemptedQuestions, student_exam_id, user_id}) {
    let score;

    await Promise.all(
      attemptedQuestions.map(async (attemptedQuestion) => {
        const { question_id, option_id } = attemptedQuestion;
        const val : boolean =
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
  }
}
