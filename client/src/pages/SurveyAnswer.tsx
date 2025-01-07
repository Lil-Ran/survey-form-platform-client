import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextInput, Flex, Text } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import QuestionDisplay from '../components/Answer/QuestionDisplay'; // 需要根据不同题型动态渲染的组件
import { Survey } from '../models/SurveyModel'; // 问卷模型
import { SurveyResponse } from '../models/SurveyResponseModel'; // 答卷模型
import api from '@Api';
import { saveAs } from 'file-saver'; // 引入file-saver库

const SurveyAnswer: React.FC = () => {
  const location = useLocation(); // 使用 useLocation 获取当前路径
  const navigate = useNavigate();
  const surveyId = location.pathname.split('/').pop(); // 从路径中获取问卷ID
  const [survey, setSurvey] = useState<Survey>({
    id: surveyId || '',
    title: '',
    isopening: false,
    questions: [],
  });
  const [answers, setAnswers] = useState<{ [questionID: string]: string | string[] }>({});
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 用于存储每个问题的引用

  useEffect(() => {
    const fetchSurvey = async () => {
      if (surveyId) {
        try {
          const response = await api.questionEdit.editQuestionsDetail(surveyId);
          if (response.status === 200) {
            const surveyData: Survey = {
              id: response.data.id,
              title: response.data.title,
              isopening: response.data.isopening,
              questions: response.data.questions,
            };
            setSurvey(surveyData);
            console.log('获取问卷详情成功:', surveyData);
          } else {
            console.error('获取问卷详情失败:', response.data);
          }
        } catch (error) {
          console.error('获取问卷详情时发生错误:', error);
        }
      }
    };

    void fetchSurvey();
  }, [surveyId]);

  // 处理用户选择或输入答案
  const handleAnswerChange = (questionID: string, selectedOptionID: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionID]: selectedOptionID, // 更新答案，可以是字符串或字符串数组
    }));
  };

  // 提交问卷
  const handleSubmit = async () => {
    console.log('User answers:', answers);
    try {
      const responseID = Math.random().toString(36).substr(2, 9);
      const surveyResponse: SurveyResponse = {
        ResponseID: responseID,
        SurveyID: survey.id,
        QuestionResponse: survey.questions.map((question) => {
          const questionResponse: {
            QuestionID: string;
            ResponseID: string;
            NumFillIns: { NumContent: number; NumFillInID: string; QuestionID: string; ResponseID: string }[];
            Options: { IsSelect: boolean; OptionContent: string; OptionID: string; QuestionID: string; ResponseID: string }[];
            TextFillIns: { TextContent: string; TextFillInID: string; QuestionID: string; ResponseID: string }[];
            QuestionType: string;
          } = {
            QuestionID: question.QuestionID,
            ResponseID: responseID,
            NumFillIns: [],
            Options: [],
            TextFillIns: [],
            QuestionType: question.QuestionType,
          };

          if (question.QuestionType === 'SingleChoice' || question.QuestionType === 'MultiChoice') {
            questionResponse.Options = question.Options.map((option) => ({
              IsSelect: Array.isArray(answers[question.QuestionID]) && (answers[question.QuestionID] as string[]).includes(option.OptionID),
              OptionContent: option.OptionContent,
              OptionID: option.OptionID,
              QuestionID: question.QuestionID,
              ResponseID: responseID,
            }));
          } else if (question.QuestionType === 'SingleNumFillIn' || question.QuestionType === 'MultiNumFillIn') {
            questionResponse.NumFillIns = question.NumFillIns.map((numFillIn, index) => ({
              NumContent: parseFloat(Array.isArray(answers[question.QuestionID]) ? (answers[question.QuestionID] as string[])[index] : answers[question.QuestionID] as string),
              NumFillInID: numFillIn.NumFillInID,
              QuestionID: question.QuestionID,
              ResponseID: responseID,
            }));

          } else if (question.QuestionType === 'SingleTextFillIn' || question.QuestionType === 'MultiTextFillIn') {
            questionResponse.TextFillIns = question.TextFillIns.map((textFillIn, index) => ({
              TextContent: Array.isArray(answers[question.QuestionID]) ? (answers[question.QuestionID] as string[])[index] : answers[question.QuestionID] as string,
              TextFillInID: textFillIn.TextFillInID,
              QuestionID: question.QuestionID,
              ResponseID: responseID,
            }));
          }

          return questionResponse;
        }),
      };
      const response = await api.respondentAccess.respondentSubmitCreate(survey.id, surveyResponse);
      if (response.status === 200) {
        console.log('答卷提交成功:', response.data);
        navigate('/surveymain'); // 保存成功后返回问卷列表
      } else {
        console.error('答卷提交失败:', response.data);
      }
    } catch (error) {
      console.error('答卷提交时发生错误:', error);
    }
  };

  // 导出答卷数据
  const handleExportResponse = () => {
    const responseID = Math.random().toString(36).substr(2, 9);
    const surveyResponse: SurveyResponse = {
      ResponseID: responseID,
      SurveyID: survey.id,
      QuestionResponse: survey.questions.map((question) => {
        const questionResponse: {
          QuestionID: string;
          ResponseID: string;
          NumFillIns: { NumContent: number; NumFillInID: string; QuestionID: string; ResponseID: string }[];
          Options: { IsSelect: boolean; OptionContent: string; OptionID: string; QuestionID: string; ResponseID: string }[];
          TextFillIns: { TextContent: string; TextFillInID: string; QuestionID: string; ResponseID: string }[];
          QuestionType: string;
        } = {
          QuestionID: question.QuestionID,
          ResponseID: responseID,
          NumFillIns: [],
          Options: [],
          TextFillIns: [],
          QuestionType: question.QuestionType,
        };

        if (question.QuestionType === 'SingleChoice' || question.QuestionType === 'MultiChoice') {
          questionResponse.Options = question.Options.map((option) => ({
            IsSelect: Array.isArray(answers[question.QuestionID]) && (answers[question.QuestionID] as string[]).includes(option.OptionID),
            OptionContent: option.OptionContent,
            OptionID: option.OptionID,
            QuestionID: question.QuestionID,
            ResponseID: responseID,
          }));
        } else if (question.QuestionType === 'SingleNumFillIn' || question.QuestionType === 'MultiNumFillIn') {
          questionResponse.NumFillIns = question.NumFillIns.map((numFillIn, index) => ({
            NumContent: parseFloat(Array.isArray(answers[question.QuestionID]) ? (answers[question.QuestionID] as string[])[index] : answers[question.QuestionID] as string),
            NumFillInID: numFillIn.NumFillInID,
            QuestionID: question.QuestionID,
            ResponseID: responseID,
          }));

        } else if (question.QuestionType === 'SingleTextFillIn' || question.QuestionType === 'MultiTextFillIn') {
          questionResponse.TextFillIns = question.TextFillIns.map((textFillIn, index) => ({
            TextContent: Array.isArray(answers[question.QuestionID]) ? (answers[question.QuestionID] as string[])[index] : answers[question.QuestionID] as string,
            TextFillInID: textFillIn.TextFillInID,
            QuestionID: question.QuestionID,
            ResponseID: responseID,
          }));
        }

        return questionResponse;
      }),
    };

    const responseData = JSON.stringify(surveyResponse, null, 2); // 将答卷数据转换为JSON字符串
    const blob = new Blob([responseData], { type: 'application/json' }); // 创建Blob对象
    saveAs(blob, `${survey.title}_response.json`); // 使用file-saver保存文件
  };

  const scrollToQuestion = (questionID: string) => {
    const questionElement = questionRefs.current[questionID];
    if (questionElement) {
      questionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // 使元素滚动到视口中央
      });
    }
  };

  return (
    <>
      {/* 顶部固定的导航栏 */}
      <Box
        style={{
          position: 'fixed', // 固定位置
          top: 0, // 距离顶部为 0
          width: '100%', // 占满屏幕宽度
          backgroundColor: '#276AB7', // 深色背景
          padding: '0.75rem', // 内边距
          color: '#ffffff', // 白色文字
          textAlign: 'center', // 居中对齐
          fontSize: '1rem', // 字体大小
          fontWeight: 'bold', // 字体加粗
          zIndex: 1000, // 确保在其他内容之上
        }}
      >
        survey-form-platform
      </Box>

      <Flex>
        {/* 左侧题目列表 */}
        <Box
          style={{
            width: '15%',
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            position: 'fixed',
            top: '3rem',
            left: 0,
            height: 'calc(200vh - 12rem)',
            overflowY: 'auto',
          }}
        >
          <Text style={{ fontSize: '20px', marginBottom: '1rem', textAlign: 'center'}}>
            题目列表
          </Text>
          {survey.questions.map((question, index) => (
            <Button
              key={question.QuestionID}
              variant="subtle"
              fullWidth
              onClick={() => scrollToQuestion(question.QuestionID)}
              style={{
                marginBottom: '0.5rem',
                height: '25px', // 设置按钮高度
                fontSize: '12.5px', // 设置字体大小
              }}
            >
              问题 {index + 1}
            </Button>
          ))}
        </Box>

        {/* 问卷列表的背景容器 */}
        <Box
          style={{
            backgroundColor: '#f7f7f7',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
            marginTop: '3rem', // 确保内容在导航栏和工具栏下方
            marginLeft: '200px', // 为左侧列表留出空间
            width: 'calc(100% - 200px)', // 减去左侧列表的宽度
          }}
        >
          {/* 问卷回答区域 */}
          <Box
            style={{
              width: '800px', // 固定宽度
              backgroundColor: '#ffffff', // 白色背景
              borderRadius: '8px', // 圆角
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 添加阴影
              padding: '2rem', // 内边距
              fontSize: '1rem', // 字体大小
            }}
          >
            {/* 问卷标题 */}
            <TextInput
              label="问卷标题"
              value={survey.title}
              readOnly
              style={{ marginBottom: '0.75rem' }}
              labelProps={{
                style: {
                  fontSize: '1rem', // 设置标签字体大小
                  fontWeight: 'bold', // 可选: 设置标签加粗
                },
              }}
            />

            {/* 问题列表 */}
            {survey.questions.map((question, index) => (
              <Box
                key={question.QuestionID}
                style={{ marginBottom: '1rem' }}
                ref={(el) => (questionRefs.current[question.QuestionID] = el)}
              >
                {/* 问题编号 */}
                <Box style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  问题 {index + 1} ({question.QuestionLabel})
                </Box>
                <QuestionDisplay
                  question={question}
                  onAnswerChange={handleAnswerChange} // 传递回调
                />
              </Box>
            ))}

            {/* 空状态提示 */}
            {survey.questions.length === 0 && (
              <Box style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
                暂无问题。
              </Box>
            )}

            {/* 提交按钮 */}
            <Box style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                color="green"
                size="lg"
                onClick={handleSubmit}
                style={{ fontSize: '1rem', fontWeight: 'bold', marginRight: '1rem' }}
              >
                提交答卷
              </Button>
              <Button
                color="blue"
                size="lg"
                onClick={handleExportResponse} // 添加导出按钮
                style={{ fontSize: '1rem', fontWeight: 'bold' }}
              >
                导出答卷
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SurveyAnswer;
