export interface AnswerModel {
  questionId: string;
  answer: string | number | string[] | number[];
  type: string;
  options: { text: string; count: number }[];
  responses?: string[];
  text?: string; // Add the text property as optional
}