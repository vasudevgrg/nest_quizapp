import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { examService } from "./exam.service";
import { questionService } from "../question/question.service";
import { OptionService } from "../option/option.service";

@Module({
    controllers:[ExamController],
    providers:[examService, questionService, OptionService]
})

export class ExamModule {}
