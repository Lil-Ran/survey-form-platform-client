import { QuestionResponseModel } from "./QuestionResponseModel";

export interface SurveyResponse {
  responseid: string;
  surveyid: string;
  questions: QuestionResponseModel[];
}