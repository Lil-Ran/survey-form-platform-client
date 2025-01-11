import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Flex, TextInput, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom'
import QuestionEditor from '@Components/Question/QuestionEditor.tsx';
import { QuestionModel } from '../../models/QuestionModel.tsx';
import { Survey } from '../../models/SurveyModel.tsx';
import api from '@Api';
import { saveAs } from 'file-saver';

const SurveyEditor: React.FC = () => {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey>({
    id: surveyId || '',
    title: '新建问卷',
    isopening: false,
    questions: []
  });

  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  // 添加新问题
  const handleAddQuestion = (type: string) => {
    const newQuestion: QuestionModel = {
      Description: '',
      LeastChoice: 0,
      MaxChoice: type === 'MultiChoice' || type === 'MultiTextFillIn' || type === 'MultiNumFillIn' ? 1 : 0,
      NumFillIns: [],
      Options: [],
      QuestionID: Math.random().toString(36).substr(2, 9), // 生成随机ID
      QuestionLabel: '',
      QuestionType: type,
      SurveyID: survey.id,
      TextFillIns: [],
      Title: '',
    };

    switch (type) {
      case 'SingleChoice':
        newQuestion.QuestionLabel = '单选题';
        newQuestion.Options = [{
          OptionContent: '',
          OptionID: Math.random().toString(36).substr(2, 9),
          QuestionID: newQuestion.QuestionID,
          SurveyID: survey.id
        }];
        break;
      case 'MultiChoice':
        newQuestion.QuestionLabel = '多选题';
        newQuestion.Options = [{
          OptionContent: '',
          OptionID: Math.random().toString(36).substr(2, 9),
          QuestionID: newQuestion.QuestionID,
          SurveyID: survey.id
        }];
        break;
      case 'SingleTextFillIn':
        newQuestion.QuestionLabel = '单项文本填空';
        newQuestion.TextFillIns = [{
          TextContent: '',
          TextFillInID: Math.random().toString(36).substr(2, 9),
          QuestionID: newQuestion.QuestionID,
          SurveyID: survey.id
        }];
        break;
      case 'MultiTextFillIn':
        newQuestion.QuestionLabel = '多项文本填空';
        newQuestion.TextFillIns = [];
        break;
      case 'SingleNumFillIn':
        newQuestion.QuestionLabel = '单项数字填空';
        newQuestion.NumFillIns = [{
          NumContent: 0,
          LeastNum: 0,
          MaxNum: 100,
          Precision: 0,
          NumFillInID: Math.random().toString(36).substr(2, 9),
          QuestionID: newQuestion.QuestionID,
          SurveyID: survey.id
        }];
        break;
      case 'MultiNumFillIn':
        newQuestion.QuestionLabel = '多项数字填空';
        newQuestion.NumFillIns = [];
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
  const handleSaveSurvey = async () => {
    try {
      const response = await api.questionEdit.editQeditCreate(survey.id, survey);
      if (response.status === 200) {
        console.log('问卷保存成功:', response.data);
        void navigate('/surveymain'); // 保存成功后返回问卷列表
      } else {
        console.error('问卷保存失败:', response.data);
      }
    } catch (error) {
      console.error('问卷保存时发生错误:', error);
    }
  };

  // 导出问卷数据
  const handleExportSurvey = () => {
    const surveyData = JSON.stringify(survey, null, 2); // 将问卷数据转换为JSON字符串
    const blob = new Blob([surveyData], { type: 'application/json' }); // 创建Blob对象
    saveAs(blob, `${survey.title}.json`); // 使用file-saver保存文件
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

      {/* 工具栏 */}
      <Flex
        justify="space-between"
        style={{
          position: 'fixed', // 固定位置
          top: '2rem',
          width: '100%', // 占满屏幕宽度
          padding: '1.25rem',
          backgroundColor: '#ffffff', // 背景色防止内容遮挡
          zIndex: 999, // 保证在内容之上，但在导航栏之下
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', // 添加阴影
        }}
      >
        <Button.Group style={{ width: '100%', gap: '0.5rem', height: '20px' }}>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleChoice')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            单选题
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiChoice')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            多选题
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleTextFillIn')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            单项文本填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiTextFillIn')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            多项文本填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('SingleNumFillIn')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            单项数字填空
          </Button>
          <Button
            variant="light"
            color="blue"
            onClick={() => handleAddQuestion('MultiNumFillIn')}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            多项数字填空
          </Button>
          <Button
            color="green"
            onClick={() => { void handleSaveSurvey(); }}
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            保存问卷
          </Button>
          <Button
            color="blue"
            onClick={handleExportSurvey} // 添加导出按钮
            style={{ flex: 1, height: '35px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            导出问卷
          </Button>
        </Button.Group>
      </Flex>

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
          {/* 问卷编辑区域 */}
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
              onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
              placeholder="请输入问卷标题"
              style={{ marginBottom: '0.75rem' }}
              labelProps={{
                style: {
                  fontSize: '1rem', // 设置标签字体大小
                  fontWeight: 'bold', // 可选: 设置标签加粗
                },
              }}
              required
            />

            {/* 问题列表 */}
            {survey.questions.map((question, index) => (
              <Box
                key={question.QuestionID}
                style={{ marginBottom: '1rem' }}
                ref={(el) => (questionRefs.current[question.QuestionID] = el)}
              >
                {/* 问题编号 */}
                <Box style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  问题 {index + 1} ({question.QuestionLabel})
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
              <Box style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
                暂无问题，请添加新问题。
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SurveyEditor;
