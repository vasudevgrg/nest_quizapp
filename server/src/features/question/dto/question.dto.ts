import { ExamDto } from 'src/features/exam/dto/exam.dto';
import { OptionDto } from 'src/features/option/dto/create-option.dto';

export class QuestionDto {
  id: number;
  name: string;
  statement: string;
  exams: Array<ExamDto>;
  options: Array<OptionDto>;
}
