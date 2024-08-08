import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exam } from '../exam/exam.entity';
import { Question } from '../question/question.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Exam, (exam) => exam.user)
  @JoinColumn()
  exams: Exam[];

  @ManyToMany(() => Exam, (exam) => exam.students)
  @JoinTable({name:'StudentExam'})
  studentExams: Exam[];

  @ManyToMany(()=> Question , (question)=> question.students)
  @JoinTable({name : 'StudentQuestion'})
  questions: Question[]
}
