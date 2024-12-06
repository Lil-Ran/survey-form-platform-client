import React, { useState } from 'react';
import { Box, Button, Flex, TextInput } from '@mantine/core';
import QuestionEditor from '../components/Question/QuestionEditor';
import { QuestionModel } from '../models/QuestionModel';
import { Survey } from '../models/SurveyModel';

const SurveyEditor: React.FC = () => {
  const [survey, setSurvey] = useState<Survey>({
    id: Date.now(),
    title: '新建问卷',
    questions: [],
  });

  // 添加新问题
  const handleAddQuestion = (type: string) => {
    const newQuestion: QuestionModel = {
      Explanation: '',
      IsRequire: false,
      IsShow: true,
      LeastChoice: 0,
      MaxChoice: type === 'MultiChoice' || type === 'MultiTextFillIn' || type === 'MultiNumFillIn' ? 1 : 0,
      NumFillIns: [],
      Options: [],
      QuestionID: Math.random().toString(36).substr(2, 9), // 生成随机ID
      QuestionLabel: '',
      QuestionType: type,
      SurveyID: survey.id.toString(),
      TextFillIns: [],
      Title: '',
    };

    switch (type) {
      case 'SingleChoice':
        newQuestion.QuestionLabel = '单选题';
        break;
      case 'MultiChoice':
        newQuestion.QuestionLabel = '多选题';
        break;
      case 'SingleTextFillIn':
        newQuestion.QuestionLabel = '单项文本填空';
        newQuestion.TextFillIns = [{ TextContent: '', TextFillInID: Math.random().toString(36).substr(2, 9) }];
        break;
      case 'MultiTextFillIn':
        newQuestion.QuestionLabel = '多项文本填空';
        newQuestion.TextFillIns = [
          { TextContent: '', TextFillInID: Math.random().toString(36).substr(2, 9) },
        ];
        break;
      case 'SingleNumFillIn':
        newQuestion.QuestionLabel = '单项数字填空';
        newQuestion.NumFillIns = [{ NumContent: 0, LeastNum: 0, MaxNum: 100, Precision: 0, NumFillInID: Math.random().toString(36).substr(2, 9) }];
        break;
      case 'MultiNumFillIn':
        newQuestion.QuestionLabel = '多项数字填空';
        newQuestion.NumFillIns = [
          { NumContent: 0, LeastNum: 0, MaxNum: 100, Precision: 0, NumFillInID: Math.random().toString(36).substr(2, 9) },
        ];
        break;
      default:
        return;
    }

    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: [...prevSurvey.questions, newQuestion],
    }));
  };

  // 更新问题
  const handleUpdateQuestion = (updatedQuestion: QuestionModel) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: prevSurvey.questions.map((q) =>
        q.QuestionID === updatedQuestion.QuestionID ? updatedQuestion : q
      ),
    }));
  };

  // 删除问题
  const handleDeleteQuestion = (questionID: string) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: prevSurvey.questions.filter((q) => q.QuestionID !== questionID),
    }));
  };

  // 保存问卷
  const handleSaveSurvey = () => {
    console.log('保存问卷:', survey);
    // 在此处添加保存逻辑，例如发送到服务器或保存到本地存储
  };

  return (
    <>
      {/* 顶部固定的导航栏 */}
      <Box
        style={{
          position: 'fixed', // 固定位置
          top: 0, // 距离顶部为 0
          width: '100%', // 占满屏幕宽度
          backgroundColor: '#2c3e50', // 深色背景
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

      {/* 工具栏 */}
      <Flex
        justify="space-between"
        style={{
          position: 'fixed', // 固定位置
          top: '4rem', 
          width: '100%', // 占满屏幕宽度
          padding: '2.5rem',
          backgroundColor: '#ffffff', // 背景色防止内容遮挡
          zIndex: 999, // 保证在内容之上，但在导航栏之下
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // 添加阴影
        }}
      >
        <Button.Group style={{ width: '100%', gap: '0.5rem', height: '40px' }}>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleChoice')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            单选题
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiChoice')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            多选题
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleTextFillIn')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            单项文本填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiTextFillIn')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            多项文本填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleNumFillIn')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            单项数字填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiNumFillIn')}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            多项数字填空
          </Button>
          <Button
            color="green"
            onClick={handleSaveSurvey}
            style={{ flex: 1, height: '70px', fontSize: '1.75rem', fontWeight: 'bold' }}
          >
            保存问卷
          </Button>
        </Button.Group>
      </Flex>

      {/* 问卷列表的背景容器 */}
      <Box
        style={{
          backgroundColor: '#f7f7f7',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 0',
          marginTop: '12rem', // 确保内容在导航栏和工具栏下方
        }}
      >
        {/* 问卷编辑区域 */}
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
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            placeholder="请输入问卷标题"
            style={{ marginBottom: '1.5rem' }}
            labelProps={{
              style: {
                fontSize: '2rem', // 设置标签字体大小
                fontWeight: 'bold', // 可选: 设置标签加粗
              },
            }}
            required
          />

          {/* 问题列表 */}
          {survey.questions.map((question, index) => (
            <Box key={question.QuestionID} style={{ marginBottom: '2rem' }}>
              {/* 问题编号 */}
              <Box style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                问题 {index + 1}
              </Box>
              <QuestionEditor
                question={question}
                onUpdate={handleUpdateQuestion}
                onDelete={() => handleDeleteQuestion(question.QuestionID)}
              />
            </Box>
          ))}

          {/* 空状态提示 */}
          {survey.questions.length === 0 && (
            <Box style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
              暂无问题，请添加新问题。
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SurveyEditor;
