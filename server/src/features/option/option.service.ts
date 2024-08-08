import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Option } from 'src/domain/option/option.entity';
import { Question } from 'src/domain/question/question.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(private dataSource: DataSource) {}

  async addOption({
    option,
    question_id,
  }: {
    option: string;
    question_id: number;
  }): Promise<{ message: string }> {
    try {
      const new_option = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Option)
        .values([{ option }])
        .returning('*')
        .execute();

      console.log(question_id, new_option.raw[0].id);
      await this.dataSource
        .createQueryBuilder()
        .relation(Question, 'options')
        .of(question_id)
        .add(new_option.raw[0].id);

      return { message: 'Option added' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to add option');
    }
  }

  async getOption({ option, question_id }): Promise<Option> {
    const foundOption = await this.dataSource
      .createQueryBuilder()
      .select('option')
      .from(Option, 'option')
      .where('option.option = :option', { option })
      .andWhere('option.questionId = :question_id', { question_id })
      .getOne();
    return foundOption;
  }
}
