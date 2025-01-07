import React, { useState } from 'react';
import { QuestionModel } from '../../models/QuestionModel';
import { Radio, Text } from '@mantine/core';

interface SingleChoiceDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (selectedOptionIDs: string[]) => void; // 回答选项变化的回调
}

const SingleChoiceDisplay: React.FC<SingleChoiceDisplayProps> = ({ question, onAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 当前选中的选项ID

  // 处理用户选择的答案
  const handleOptionSelect = (optionID: string) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = prevSelected.includes(optionID)
        ? [] // 如果点击已选择的选项，清空选择
        : [optionID]; // 否则选中当前选项

      // 限制选择的数量
      if (newSelected.length > 1) {
        return prevSelected; // 如果超过最大选择数量，不做任何更改
      }
      if (newSelected.length < 0) {
        return prevSelected; // 如果少于最少选择数量，不做任何更改
      }

      onAnswerChange(newSelected); // 调用回调传递选中的答案
      return newSelected;
    });
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" style={{ marginTop: '0.5rem' }}>{question.Description}</Text>

      <div style={{ marginTop: '1rem' }}>
        {/* 使用 Radio.Group 来处理单选逻辑 */}
        {question.Options.map((option) => (
          <Radio
            key={option.OptionID}
            value={option.OptionID}
            label={option.OptionContent} // 显示选项内容
            checked={selectedOptions.includes(option.OptionID)} // 判断选项是否被选中
            onChange={() => handleOptionSelect(option.OptionID)} // 选项变化时调用的回调
            style={{ marginBottom: '0.5rem' }}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceDisplay;
