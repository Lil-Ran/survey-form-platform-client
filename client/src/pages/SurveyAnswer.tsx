import React, { useState, useRef } from 'react';
import { Box, Button, TextInput, Flex, Text } from '@mantine/core';
import QuestionDisplay from '../components/Answer/QuestionDisplay'; // 需要根据不同题型动态渲染的组件
import { Survey } from '../models/SurveyModel'; // 问卷模型
import exampleSurvey from '../models/exampleSurvey';

interface SurveyAnswerProps {
  survey: Survey; // 接收问卷数据
  onSubmit: (answers: { [questionID: string]: string | string[] }) => void; // 提交答案的回调
}

const SurveyAnswer: React.FC<SurveyAnswerProps> = ({ survey, onSubmit }) => {
  const [answers, setAnswers] = useState<{ [questionID: string]: string | string[] }>({});
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 用于存储每个问题的引用

  // 处理用户选择或输入答案
  const handleAnswerChange = (questionID: string, selectedOptionID: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionID]: selectedOptionID, // 更新答案，可以是字符串或字符串数组
    }));
  };

  // 提交问卷
  const handleSubmit = () => {
    onSubmit(answers); // 调用提交回调函数
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
          padding: '1.5rem', // 内边距
          color: '#ffffff', // 白色文字
          textAlign: 'center', // 居中对齐
          fontSize: '2rem', // 字体大小
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
            top: '6rem',
            left: 0,
            height: 'calc(100vh - 12rem)',
            overflowY: 'auto',
          }}
        >
          <Text style={{ fontSize: '40px', marginBottom: '1rem', textAlign: 'center'}}>
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
                height: '50px', // 设置按钮高度
                fontSize: '25px', // 设置字体大小
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
            marginTop: '6rem', // 确保内容在导航栏和工具栏下方
            marginLeft: '200px', // 为左侧列表留出空间
            width: 'calc(100% - 200px)', // 减去左侧列表的宽度
          }}
        >
          {/* 问卷回答区域 */}
          <Box
            style={{
              width: '1600px', // 固定宽度
              backgroundColor: '#ffffff', // 白色背景
              borderRadius: '8px', // 圆角
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 添加阴影
              padding: '2rem', // 内边距
              fontSize: '2rem', // 字体大小
            }}
          >
            {/* 问卷标题 */}
            <TextInput
              label="问卷标题"
              value={survey.title}
              readOnly
              style={{ marginBottom: '1.5rem' }}
              labelProps={{
                style: {
                  fontSize: '2rem', // 设置标签字体大小
                  fontWeight: 'bold', // 可选: 设置标签加粗
                },
              }}
            />

            {/* 问题列表 */}
            {survey.questions.map((question, index) => (
              <Box
                key={question.QuestionID}
                style={{ marginBottom: '2rem' }}
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
                style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
              >
                提交答卷
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

// SurveyAnswerParentComponent 组件定义, 负责提供 surveyData 和 handleSubmit 函数，并将它们作为 props 传递给 SurveyAnswer 组件。
const SurveyAnswerParentComponent: React.FC = () => {
  const surveyData: Survey = exampleSurvey;

  // 处理提交的答案
  const handleSubmit = (answers: { [questionID: string]: string | string[] }) => {
    console.log('User answers:', answers);
    // 在这里可以处理提交逻辑，例如发送数据到服务器等
  };

  return (
    <div>
      <SurveyAnswer survey={surveyData} onSubmit={handleSubmit} />
    </div>
  );
};

export default SurveyAnswerParentComponent;
