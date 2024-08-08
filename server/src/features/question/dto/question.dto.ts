import { Option } from 'src/domain/option/option.entity';
import { ExamDto } from 'src/features/exam/dto/exam.dto';


export class returnCreateQuestionDto {
  id: number;
  name: string;
  statement: string;
  options: Array<Option>;
  exams: Array<ExamDto>
}

export class createQuestionDto {
  name: string;
  statement: string;
  exam_id: number;
  options: Array<string>;
  correct_option: string;
}
