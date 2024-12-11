import React, { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { QuestionModel} from '../../models/QuestionModel';

interface SingleChoiceDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (selectedOptionID: string) => void; // 回答选项变化的回调
}

const SingleChoiceDisplay: React.FC<SingleChoiceDisplayProps> = ({ question, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // 当前选中的选项ID

  // 处理用户选择的答案
  const handleOptionSelect = (optionID: string) => {
    setSelectedOption(optionID); // 设置选中的选项
    onAnswerChange(optionID); // 调用回调传递选中的答案
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" color="gray" style={{ marginTop: '0.5rem' }}>{question.Explanation}</Text>

      <div style={{ marginTop: '1rem' }}>
        {/* 渲染每个选项 */}
        {question.Options.map((option) => (
          <Button
            key={option.OptionID}
            variant={selectedOption === option.OptionID ? 'filled' : 'light'} // 选中的选项变为填充样式
            fullWidth
            style={{ marginBottom: '0.5rem' }}
            onClick={() => handleOptionSelect(option.OptionID)}
          >
            {option.OptionContent}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceDisplay;
