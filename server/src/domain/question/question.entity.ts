import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exam } from '../exam/exam.entity';
import { Option } from '../option/option.entity';
import { User } from '../user/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  statement: string;
  @Column()
  name: string;

  @Column({
    nullable:true
  })
  correct_option_id: number;

  @ManyToMany(() => Exam, (e) => e.questions)
  exams: Exam[];

  @OneToMany(() => Option, (e) => e.question)
  @JoinColumn()
  options: Option[];

  @ManyToMany(()=> User, (user)=> user.questions)
  students: User[]
}
