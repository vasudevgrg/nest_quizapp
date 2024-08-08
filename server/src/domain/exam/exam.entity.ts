import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';

@Entity('exam')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.exams)
  user: User;

  @ManyToMany(()=> User, (user)=> user.studentExams)
  students: User[]

  @ManyToMany(() => Question, (e) => e.exams)
  @JoinTable()
  questions: Question[];
}
