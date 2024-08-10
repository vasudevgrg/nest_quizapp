import { Body, Controller, Post } from '@nestjs/common';
import { questionService as QuestionService } from './question.service';
import { createQuestionDto, examRelationDto } from './dto/question.dto';

@Controller('question')
export class questionControler {
  constructor(private readonly questionService: QuestionService) {}

  @Post('createquestion')
  async createQuestion(@Body() body : createQuestionDto) {
    const { name, statement, exam_id, options , correct_option}= body;
    const question = await this.questionService.createQuestion({
      name,
      statement,
      exam_id,
      options,
      correct_option
    });
    return question;
  };

  @Post('searchquestions')
  async searchQuestions (@Body() body: {question_name: string}) {
    const {question_name} = body;
    const questions= await this.questionService.searchQuestions({name: question_name});
    return questions;
  }

  @Post('examrelation')
  async examRelation (@Body() body: examRelationDto ) {
    const {question_id, exam_id} = body;
    const result= await this.questionService.searchRelation({question_id, exam_id});
    return result;
  }
}
