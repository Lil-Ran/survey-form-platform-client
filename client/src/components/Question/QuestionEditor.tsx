import React from 'react';
import { Box } from '@mantine/core';
import SingleChoice from './SingleChoice'; // 单选题组件
import MultiChoice from './MultiChoice'; // 多选题组件
import SingleTextFillIn from './SingleTextFillIn'; // 单项文本填空组件
import MultiTextFillIn from './MultiTextFillIn'; // 多项文本填空组件
import SingleNumFillIn from './SingleNumFillIn'; // 单项数字填空
import MultiNumFillIn from './MultiNumFillIn'; // 多项数字填空
import { QuestionModel } from '../../models/QuestionModel'; // 问题的数据模型

// 定义组件的 Props
interface QuestionEditorProps {
  question: QuestionModel; // 当前问题的数据
  onUpdate: (updatedQuestion: QuestionModel) => void; // 更新问题的回调函数
  onDelete: () => void; // 删除问题的回调函数
}

// 问题编辑器组件
const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onUpdate, onDelete }) => {
  const renderQuestionBody = () => {
    switch (question.QuestionType) {
      case 'SingleChoice': // 如果是单选题
        return (
          <SingleChoice
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      case 'MultiChoice': // 如果是多选题
        return (
          <MultiChoice
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      case 'SingleTextFillIn':
        return (
          <SingleTextFillIn
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      case 'MultiTextFillIn': // 如果是单选题
        return (
          <MultiTextFillIn
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      case 'SingleNumFillIn': // 如果是单选题
        return (
          <SingleNumFillIn
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      case 'MultiNumFillIn': // 如果是单选题
        return (
          <MultiNumFillIn
            question={question} // 当前问题数据
            onUpdate={onUpdate} // 更新回调
            onDelete={onDelete} // 删除回调
          />
        );
      default: // 如果是未知类型
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

export default QuestionEditor;
