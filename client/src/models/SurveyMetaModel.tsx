export interface Option {
  OptionID: string;
  OptionContent: string;
  QuestionID: string;
  SurveyID: string;
}

export interface NumFillIn {
  NumFillInID: string;
  QuestionID: string;
  SurveyID: string;
}

export interface TextFillIn {
  TextFillInID: string;
  QuestionID: string;
  SurveyID: string;
}

export interface Question {
  QuestionType: string;
  QuestionLabel: string;
  QuestionID: string;
  Title: string;
  Description: string;
  LeastChoice: number;
  MaxChoice: number;
  SurveyID: string;
  Options: Option[];
  NumFillIns: NumFillIn[];
  TextFillIns: TextFillIn[];
}

export interface SurveyResponseModel {
  id: string;
  title: string;
  isopening: boolean;
  questions: Question[];
}
