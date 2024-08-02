import { QuestionDto } from 'src/features/question/dto/question.dto';

export class OptionDto {
  id: number;
  option: string;
  question: QuestionDto;
}
