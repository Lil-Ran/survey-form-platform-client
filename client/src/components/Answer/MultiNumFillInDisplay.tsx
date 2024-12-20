import React, { useState } from 'react';
import { TextInput, Text } from '@mantine/core';
import { QuestionModel } from '../../models/QuestionModel';

interface MultiNumFillInDisplayProps {
  question: QuestionModel; // 问题数据
  onAnswerChange: (values: string[]) => void; // 回答变化的回调
}

const MultiNumFillInDisplay: React.FC<MultiNumFillInDisplayProps> = ({ question, onAnswerChange }) => {
  const [values, setValues] = useState<string[]>(new Array(question.NumFillIns.length).fill('')); // 每个数字填空的值

  // 处理输入变化
  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = event.target.value; // 更新特定位置的值
    setValues(newValues); // 更新输入值
    onAnswerChange(newValues); // 调用回调传递答案
  };

  return (
    <div>
      <Text size="lg">{question.Title}</Text>
      <Text size="sm" style={{ marginTop: '0.5rem' }}>{question.Explanation}</Text>

      <div style={{ marginTop: '1rem' }}>
        {/* 渲染每个数字填空 */}
        {question.NumFillIns.map((numFillIn, index) => (
          <TextInput
            key={numFillIn.NumFillInID}
            type="number"
            value={values[index]}
            onChange={(event) => handleInputChange(index, event)}
            placeholder={`请输入第 ${index + 1} 个数字`}
            style={{ marginBottom: '0.5rem', width: '100%' }}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiNumFillInDisplay;
