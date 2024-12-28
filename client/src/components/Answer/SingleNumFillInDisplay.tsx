import React, { useState } from 'react';
import { TextInput, Text } from '@mantine/core';
import { QuestionModel } from '../../models/QuestionModel';

interface SingleNumFillInDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (value: string) => void; // 回答变化的回调
}

const SingleNumFillInDisplay: React.FC<SingleNumFillInDisplayProps> = ({ question, onAnswerChange }) => {
  const [value, setValue] = useState<string>(''); // 填写的数字

  // 处理输入变化
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue); // 更新输入值
    onAnswerChange(inputValue); // 调用回调传递答案
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" style={{ marginTop: '0.5rem' }}>{question.Explanation}</Text>

      <div style={{ marginTop: '1rem' }}>
        <TextInput
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="请输入数字"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default SingleNumFillInDisplay;
