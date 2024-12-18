import React, { useState } from 'react';
import { TextInput, Flex, Button, Textarea } from '@mantine/core';
import { QuestionModel, TextFillIn } from '../../models/QuestionModel';

interface MultiTextFillInProps {
  question: QuestionModel;
  onUpdate: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
}

const MultiTextFillIn: React.FC<MultiTextFillInProps> = ({ question, onUpdate, onDelete }) => {
  const [explanationCursor, setExplanationCursor] = useState<number>(0);

  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, Title: title });
  };

  const handleExplanationChange = (explanation: string) => {
    onUpdate({ ...question, Explanation: explanation });
  };

  const handleAddTextFillIn = () => {
    const newTextFillIn: TextFillIn = {
      TextContent: '',
      TextFillInID: Math.random().toString(36).substr(2, 9),
    };
    const explanation = question.Explanation || '';
    const placeholder = ` ______ `;

    const newExplanation =
      explanation.slice(0, explanationCursor) +
      placeholder +
      explanation.slice(explanationCursor);

    onUpdate({
      ...question,
      Explanation: newExplanation,
      TextFillIns: [...question.TextFillIns, newTextFillIn],
    });
  };

  const handleCursorPosition = (e: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setExplanationCursor(target.selectionStart || 0);
  };

  return (
    <Flex direction="column" gap="sm">
      <TextInput
        label="题目标题"
        value={question.Title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="请输入题目标题"
        labelProps={{
          style: {
            fontSize: '1.5rem', // 设置标签字体大小
          },
        }}
        required
      />
      <Textarea
        label="问题说明"
        value={question.Explanation}
        onChange={(e) => handleExplanationChange(e.target.value)}
        placeholder="可选：请输入问题说明"
        minRows={2}
        onMouseUp={handleCursorPosition}
        onKeyUp={handleCursorPosition}
        labelProps={{
          style: {
            fontSize: '1.5rem', // 设置标签字体大小
          },
        }}
      />

      {/* 按钮容器 */}
      <Flex justify="space-between" style={{ marginTop: '1rem' }}>
          <Button variant="light" color="blue" onClick={handleAddTextFillIn}>
            添加文本填空项
          </Button>
          <Button color="red" variant="outline" onClick={onDelete} >
            删除问题
          </Button>
      </Flex>
    </Flex>
  );
};

export default MultiTextFillIn;
