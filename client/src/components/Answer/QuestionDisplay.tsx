import React from 'react';
import { Box } from '@mantine/core';
import SingleChoiceDisplay from './SingleChoiceDisplay'; // 单选题展示组件
import MultiChoiceDisplay from './MultiChoiceDisplay'; // 多选题展示组件
import SingleNumFillInDisplay from './SingleNumFillInDisplay'; // 单数字填空题展示组件
import MultiNumFillInDisplay from './MultiNumFillInDisplay'; // 多数字填空题展示组件
import SingleTextFillInDisplay from './SingleTextFillInDisplay'; // 单文本填空题展示组件
import MultiTextFillInDisplay from './MultiTextFillInDisplay'; // 多文本填空题展示组件
import { QuestionModel } from '../../models/QuestionModel';

interface QuestionDisplayProps {
  question: QuestionModel; // 当前问题的数据
  onAnswerChange: (questionID: string, value: string | string[]) => void; // 用户选择答案的回调
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, onAnswerChange }) => {
  // 包装一下 onAnswerChange，传递额外的 questionID
  const handleAnswerChange = (value: string | string[]) => {
    onAnswerChange(question.QuestionID, value); // 传递 questionID 和选中的答案
  };

  const renderQuestionBody = () => {
    switch (question.QuestionType) {
      case 'SingleChoice': // 单选题
        return (
          <SingleChoiceDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'MultiChoice': // 多选题
        return (
          <MultiChoiceDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'SingleNumFillIn': // 单数字填空题
        return (
          <SingleNumFillInDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'MultiNumFillIn': // 多数字填空题
        return (
          <MultiNumFillInDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'SingleTextFillIn': // 单文本填空题
        return (
          <SingleTextFillInDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'MultiTextFillIn': // 多文本填空题
        return (
          <MultiTextFillInDisplay
            question={question}
            onAnswerChange={handleAnswerChange}
          />
        );
      default:
        return <div>未知问题类型</div>;
    }
  };

  return (
    <Box
      style={{
        marginBottom: '1.5rem', // 外边距
        padding: '1rem', // 内边距
        border: '1px solid #e0e0e0', // 边框
        borderRadius: '8px', // 圆角
      }}
    >
      {/* 问题主体内容（根据问题类型动态渲染） */}
      {renderQuestionBody()}
    </Box>
  );
};

export default QuestionDisplay;
