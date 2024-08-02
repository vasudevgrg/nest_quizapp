import { QuestionDto } from 'src/features/question/dto/question.dto';
import { UserDto } from 'src/features/user/dto/create-user.dto';

export class ExamDto {
  id: number;
  name: string;
  questions: Array<QuestionDto>;
  user: UserDto;
}
