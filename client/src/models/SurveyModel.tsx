import { QuestionModel } from "./QuestionModel";

export interface Survey {
  surveyid: string;
  title: string;
  questions: QuestionModel[];
}