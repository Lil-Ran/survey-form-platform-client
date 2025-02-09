import React, { useState } from 'react';
import { TextInput, Text } from '@mantine/core';
import { QuestionModel } from '../../models/QuestionModel';

interface SingleTextFillInDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (value: string) => void; // 回答变化的回调
}

const SingleTextFillInDisplay: React.FC<SingleTextFillInDisplayProps> = ({ question, onAnswerChange }) => {
  const [value, setValue] = useState<string>(''); // 填写的文本

  // 处理输入变化
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue); // 更新输入值
    onAnswerChange(inputValue); // 调用回调传递答案
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" style={{ marginTop: '0.5rem' }}>{question.Description}</Text>

      <div style={{ marginTop: '1rem' }}>
        <TextInput
          value={value}
          onChange={handleInputChange}
          placeholder="请输入文本"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default SingleTextFillInDisplay;
