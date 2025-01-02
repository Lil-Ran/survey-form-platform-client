import { QuestionModel } from "./QuestionModel";

export interface Survey {
  SurveyID: string;
  Title: string;
  questions: QuestionModel[];
}