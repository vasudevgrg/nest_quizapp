import { Body, Controller, Post } from '@nestjs/common';
import { questionService as QuestionService } from './question.service';
import { createQuestionDto } from './dto/question.dto';

@Controller('question')
export class questionControler {
  constructor(private readonly questionService: QuestionService) {}

  @Post('createquestion')
  async createQuestion(@Body() body : createQuestionDto) {
    const { name, statement, exam_id, options , correct_option}= body;
    console.log(name + " inside "+ statement);
    const question = await this.questionService.createQuestion({
      name,
      statement,
      exam_id,
      options,
      correct_option
    });
    return question;
  }
}
