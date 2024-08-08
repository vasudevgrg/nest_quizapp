import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @ManyToOne(() => Question, (e) => e.options)
  question: Question;
}
