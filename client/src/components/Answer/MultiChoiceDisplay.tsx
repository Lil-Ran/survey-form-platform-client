import React, { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { QuestionModel } from '../../models/QuestionModel';

interface MultiChoiceDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (selectedOptionIDs: string[]) => void; // 回答选项变化的回调
}

const MultiChoiceDisplay: React.FC<MultiChoiceDisplayProps> = ({ question, onAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 当前选中的选项IDs

  // 处理用户选择的答案
  const handleOptionSelect = (optionID: string) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = prevSelected.includes(optionID)
        ? prevSelected.filter((id) => id !== optionID) // 如果已经选择，则取消选择
        : [...prevSelected, optionID]; // 否则添加该选项
      onAnswerChange(newSelected); // 调用回调传递选中的答案
      return newSelected;
    });
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
            variant={selectedOptions.includes(option.OptionID) ? 'filled' : 'light'} // 选中的选项变为填充样式
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

export default MultiChoiceDisplay;
