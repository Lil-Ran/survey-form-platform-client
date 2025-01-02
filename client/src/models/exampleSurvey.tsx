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
      SurveyID: "survey1",
      Options: [
        { OptionID: "a", OptionContent: "JavaScript" },
        { OptionID: "b", OptionContent: "Python" },
        { OptionID: "c", OptionContent: "Java" },
        { OptionID: "d", OptionContent: "C#" },
        { OptionID: "e", OptionContent: "其它" }
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
      SurveyID: "survey1",
      Options: [
        { OptionID: "a", OptionContent: "React" },
        { OptionID: "b", OptionContent: "Vue" },
        { OptionID: "c", OptionContent: "Angular" },
        { OptionID: "d", OptionContent: "Svelte" }
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
      SurveyID: "survey1",
      Options: [],
      NumFillIns: [],
      TextFillIns: [
        {
          TextFillInID: "text1",
          TextContent: "",
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
      SurveyID: "survey1",
      Options: [],
      NumFillIns: [],
      TextFillIns: [
        {
          TextFillInID: "text1",
          TextContent: "",
        },
        {
          TextFillInID: "text2",
          TextContent: "",
        },
        {
          TextFillInID: "text3",
          TextContent: "",
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
      SurveyID: "survey1",
      Options: [],
      NumFillIns: [
        {
          NumFillInID: "num1",
          NumContent: 25,
          LeastNum: 18,
          MaxNum: 100,
          Precision: 0,
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
      SurveyID: "survey1",
      Options: [],
      NumFillIns: [
        {
          NumFillInID: "num2",
          NumContent: 25,
          LeastNum: 18,
          MaxNum: 100,
          Precision: 0,
        },
        {
          NumFillInID: "num3",
          NumContent: 25,
          LeastNum: 18,
          MaxNum: 100,
          Precision: 0,
        }
      ],
      TextFillIns: [],
    } 
  ]
};

export default exampleSurvey;
