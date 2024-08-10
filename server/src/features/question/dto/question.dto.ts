import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsNumber } from 'class-validator';
import { Option } from 'src/domain/option/option.entity';
import { ExamDto } from 'src/features/exam/dto/exam.dto';
import { CreateOptionDto } from 'src/features/option/dto/create-option.dto';


export class returnCreateQuestionDto {
  id: number;
  name: string;
  statement: string;
  options: Array<Option>;
  exams: Array<ExamDto>;
}

export class createQuestionDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  exam_id: number;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  options: Array<string>;

  @IsNotEmpty()
  correct_option: string;
}

export class examRelationDto {
  @IsNumber()
  question_id: number;

  exam_id: number;
}
