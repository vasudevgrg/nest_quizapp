import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from '../option/option.entity';

@Entity()
export class StudentQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  user_id: number;

  @Column()
  student_exam_id: number;

  @OneToOne(()=> Option)
  @JoinColumn()
  option : Option
}
