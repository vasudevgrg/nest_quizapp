import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Option } from 'src/domain/option/option.entity';
import { Question } from 'src/domain/question/question.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';

@Injectable()
export class OptionService {
  constructor(private dataSource: DataSource) {}

  async addOption(
    {
      option,
      question_id,
    }: {
      option: string;
      question_id: number;
    },
    queryRunner: QueryRunner,
  ): Promise<{ message: string }> {
    try {
      const manager = queryRunner.manager;
      const new_option = await manager
        .createQueryBuilder(queryRunner)
        .insert()
        .into(Option)
        .values([{ option }])
        .returning('*')
        .execute();

      console.log(new_option);

      await this.dataSource
        .createQueryBuilder(queryRunner)
        .relation(Question, 'options')
        .of(question_id)
        .add(new_option.raw[0].id);

      return { message: 'Option added' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to add option');
    }
  }

  async getOption(
    { option, question_id }: CreateOptionDto,
    queryRunner: QueryRunner,
  ): Promise<Option> {
    console.log(option, question_id);

    return queryRunner.manager
      .createQueryBuilder()
      .select('option')
      .from(Option, 'option')
      .where('option.option = :option', { option })
      .andWhere('option.questionId = :question_id', { question_id })
      .getOne();
  }
}
