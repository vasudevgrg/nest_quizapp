import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @OneToOne(() => Question, (e) => e.options)
  question: Question;
}
