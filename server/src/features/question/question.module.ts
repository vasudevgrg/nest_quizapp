import { Module } from "@nestjs/common";
import { questionControler } from "./question.controller";
import { questionService } from "./question.service";
import { OptionService } from "../option/option.service";
import { examService } from "../exam/exam.service";

@Module({
    controllers:[questionControler],
    providers:[questionService, OptionService, examService],

})

export class QuestionModule {};
