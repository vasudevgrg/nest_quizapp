import { examInterface } from 'src/features/exam/interfaces/exam.interface';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  exams: Array<examInterface>;
}
