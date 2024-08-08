import { returnCreateQuestionDto } from 'src/features/question/dto/question.dto';
import { UserDto } from 'src/features/user/dto/create-user.dto';

export class ExamDto {
  id: number;
  name: string;
  questions: Array<returnCreateQuestionDto>;
  user: UserDto;
}

export class CreateExamDto {
  name: string;
  user_id: number;
}

export class SubmitExamDto {
  attemptedQuestions : Array<{question_id:number,option_id: number}>
}