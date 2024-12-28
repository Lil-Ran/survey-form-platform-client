import React, { useState } from 'react';
import { QuestionModel } from '../../models/QuestionModel';
import { Radio, Text } from '@mantine/core';

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
      <Text size="sm" style={{ marginTop: '0.5rem' }}>{question.Explanation}</Text>

      <div style={{ marginTop: '1rem' }}>
        {/* 使用 Radio.Group 来处理单选逻辑 */}
        <Radio.Group
          value={selectedOption} // 当前选中的值
          onChange={handleOptionSelect} // 选项变化时调用的回调
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {/* 渲染每个选项 */}
          {question.Options.map((option) => (
            <Radio
              key={option.OptionID}
              value={option.OptionID}
              label={option.OptionContent} // 显示选项内容
              style={{ marginBottom: '0.5rem' }}
            />
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default SingleChoiceDisplay;
