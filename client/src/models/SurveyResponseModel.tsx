import { QuestionResponseModel } from "./QuestionResponseModel";

export interface SurveyResponse {
  ResponseID: string;
  SurveyID: string;
  questionsResponse: QuestionResponseModel[];
}