import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentExam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    exam_id: number;

    @Column({
        nullable: true
    })
    score: number;

}