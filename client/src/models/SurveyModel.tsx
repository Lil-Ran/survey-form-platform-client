import { QuestionModel } from "./QuestionModel";

export interface Survey {
  id: string;
  title: string;
  isopening: boolean;
  questions: QuestionModel[];
}

