import { Survey } from './SurveyModel';

const exampleSurvey: Survey = {
  SurveyID: 'Survey1',
  Title: "用户满意度调查",
  questions: [
    {
      QuestionID: "q1",
      Title: "您最喜欢的编程语言是什么？",
      QuestionType: "SingleChoice",
      QuestionLabel: "单选题",
      Description: "请选择您最喜欢的编程语言。",
      LeastChoice: 1,
      MaxChoice: 1,
      SurveyID: "Survey1",
      Options: [
        { OptionID: "123123", OptionContent: "JavaScript" },
        { OptionID: "werqwerq", OptionContent: "Python" },
        { OptionID: "adsfas", OptionContent: "Java" },
        { OptionID: "zcxvzx", OptionContent: "C#" },
        { OptionID: "asdfasdf", OptionContent: "其它" }
      ],
      NumFillIns: [],
      TextFillIns: [],
    },

    {
      QuestionID: "q2",
      Title: "您常用的前端框架是什么？",
      QuestionType: "MultiChoice",
      QuestionLabel: "多选题",
      Description: "请选择您常用的前端框架。",
      LeastChoice: 1,
      MaxChoice: 3,
      SurveyID: "Survey1",
      Options: [
        { OptionID: "cdasdfasdf", OptionContent: "React" },
        { OptionID: "zxcvzsdfad", OptionContent: "Vue" },
        { OptionID: "fgbstgerg", OptionContent: "Angular" },
        { OptionID: "awerEWRDD", OptionContent: "Svelte" }
      ],
      NumFillIns: [],
      TextFillIns: [],
    },

    {
      QuestionID: "q3",
      Title: "请填写您最喜欢的编程语言",
      QuestionType: "SingleTextFillIn",
      QuestionLabel: "单项文本填空题",
      Description: "请在下面的文本框中填写您的答案。",
      LeastChoice: 1,
      MaxChoice: 1,
      SurveyID: "Survey1",
      Options: [],
      NumFillIns: [],
      TextFillIns: [
        {
          TextFillInID: "text1",
        }
      ],
    },

    {
      QuestionID: "q4",
      Title: "请排出您最喜欢的编程语言前三名",
      QuestionType: "MultiTextFillIn",
      QuestionLabel: "多项文本填空题",
      Description: "第一名:[填空], 第二名:[填空], 第三名:[填空]\n",
      LeastChoice: 1,
      MaxChoice: 1,
      SurveyID: "Survey1",
      Options: [],
      NumFillIns: [],
      TextFillIns: [
        {
          TextFillInID: "text2",
        },
        {
          TextFillInID: "text3",
        },
        {
          TextFillInID: "text4",
        }
      ],
    },

    {
      QuestionID: "q5",
      Title: "请输入您的年龄",
      QuestionType: "SingleNumFillIn",
      QuestionLabel: "单项数字填空题",
      Description: "请输入您的年龄，数字范围为 18 到 100。",
      LeastChoice: 1,
      MaxChoice: 1,
      SurveyID: "Survey1",
      Options: [],
      NumFillIns: [
        {
          NumFillInID: "num1",
        }
      ],
      TextFillIns: [],
    },

    {
      QuestionID: "q6",
      Title: "请输入您家里人的年龄",
      QuestionType: "MultiNumFillIn",
      QuestionLabel: "多项数字填空题",
      Description: "爸爸:[填空], 妈妈:[填空]",
      LeastChoice: 1,
      MaxChoice: 1,
      SurveyID: "Survey1",
      Options: [],
      NumFillIns: [
        {
          NumFillInID: "num2",
        },
        {
          NumFillInID: "num3",
        }
      ],
      TextFillIns: [],
    } 
  ]
};

export default exampleSurvey;
