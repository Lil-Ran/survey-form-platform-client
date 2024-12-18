import { QuestionModel } from "./QuestionModel";

export interface Survey {
  id: number;
  title: string;
  questions: QuestionModel[];
}