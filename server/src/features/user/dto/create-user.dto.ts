import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ExamDto } from 'src/features/exam/dto/exam.dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
  exams: Array<ExamDto>;
}

export class LoginDto {
  email: string;
  password: string;
}
