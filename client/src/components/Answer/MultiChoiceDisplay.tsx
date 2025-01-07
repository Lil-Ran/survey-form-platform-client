import React, { useState } from 'react';
import { Text, Checkbox } from '@mantine/core';
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

      // 限制选择的数量
      if (newSelected.length > question.MaxChoice) {
        return prevSelected; // 如果超过最大选择数量，不做任何更改
      }
      if (newSelected.length < question.LeastChoice) {
        return prevSelected; // 如果少于最少选择数量，不做任何更改
      }

      onAnswerChange(newSelected); // 调用回调传递选中的答案
      return newSelected;
    });
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" color="gray" style={{ marginTop: '0.5rem' }}>
        {question.Description}
      </Text>

      <div style={{ marginTop: '1rem' }}>
        {/* 渲染每个选项 */}
        {question.Options.map((option) => (
          <Checkbox
            key={option.OptionID}
            value={option.OptionID} // 选项的ID作为值
            label={option.OptionContent} // 显示选项内容
            checked={selectedOptions.includes(option.OptionID)} // 判断选项是否被选中
            onChange={() => handleOptionSelect(option.OptionID)} // 选项选择的回调
            style={{ marginBottom: '0.5rem' }}
            disabled={selectedOptions.length >= question.MaxChoice && !selectedOptions.includes(option.OptionID)} // 禁用超过最大选择数量的未选中选项
          />
        ))}
      </div>

      {/* 显示选择数量提示 */}
      <Text size="sm" style={{ marginTop: '1rem' }}>
        {`请选择 ${question.LeastChoice} 至 ${question.MaxChoice} 个选项`}
      </Text>
    </div>
  );
};

export default MultiChoiceDisplay;
