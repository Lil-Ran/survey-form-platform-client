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
    const placeholder = `[填空]`; // 使用标识符作为占位符

    const newExplanation =
      explanation.slice(0, explanationCursor) +
      placeholder +
      explanation.slice(explanationCursor);

    onUpdate({
      ...question,
      Explanation: newExplanation,
      TextFillIns: [...question.TextFillIns, newTextFillIn],
    });

    // 更新光标位置
    setExplanationCursor(explanationCursor + placeholder.length);
  };

  const handleCursorPosition = (e: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setExplanationCursor(target.selectionStart || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const explanation = question.Explanation || '';
    const placeholder = '[填空]';
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const cursorPosition = explanationCursor;

      // 检查光标是否在占位符的开头
      if (
        cursorPosition > 0 &&
        explanation.slice(cursorPosition - placeholder.length, cursorPosition) === placeholder
      ) {
        e.preventDefault(); // 阻止默认的删除行为
        // 删除整个占位符
        const newExplanation = explanation.slice(0, cursorPosition - placeholder.length) + explanation.slice(cursorPosition);
        
        // 删除对应的文本填空项
        const newTextFillIns = question.TextFillIns.slice(0, -1);

        onUpdate({ ...question, Explanation: newExplanation, TextFillIns: newTextFillIns });
        setExplanationCursor(cursorPosition - placeholder.length); // 更新光标位置
      }
    }
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
            fontSize: '1.5rem',
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
        onKeyDown={handleKeyDown} // 添加对按键事件的监听
        labelProps={{
          style: {
            fontSize: '1.5rem',
          },
        }}
      />

      <Flex justify="space-between" style={{ marginTop: '1rem' }}>
        <Button variant="light" color="blue" onClick={handleAddTextFillIn}>
          添加文本填空项
        </Button>
        <Button color="red" variant="outline" onClick={onDelete}>
          删除问题
        </Button>
      </Flex>
    </Flex>
  );
};

export default MultiTextFillIn;
