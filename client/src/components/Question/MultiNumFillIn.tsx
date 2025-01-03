import React, { useState } from 'react';
import { TextInput, Flex, Button, Textarea } from '@mantine/core';
import { QuestionModel, NumFillIn } from '../../models/QuestionModel';

interface MultiNumFillInProps {
  question: QuestionModel; // 问题数据
  onUpdate: (updatedQuestion: QuestionModel) => void; // 更新问题回调
  onDelete: () => void; // 删除问题回调
}

const MultiNumFillIn: React.FC<MultiNumFillInProps> = ({ question, onUpdate, onDelete }) => {
  const [explanationCursor, setExplanationCursor] = useState<number>(0); // 光标位置

  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, Title: title });
  };

  const handleExplanationChange = (explanation: string) => {
    onUpdate({ ...question, Explanation: explanation });
  };

  const handleAddNumFillIn = () => {
    const newNumFillIn: NumFillIn = {
      NumFillInID: Math.random().toString(36).substr(2, 9), // 生成随机 ID
    };

    const explanation = question.Explanation || '';
    const placeholder = `[填空]`; // 占位符

    const newExplanation =
      explanation.slice(0, explanationCursor) +
      placeholder +
      explanation.slice(explanationCursor);

    onUpdate({
      ...question,
      Explanation: newExplanation,
      NumFillIns: [...question.NumFillIns, newNumFillIn],
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
        
        // 删除对应的数字填空项
        const newNumFillIns = question.NumFillIns.slice(0, -1);

        onUpdate({ ...question, Explanation: newExplanation, NumFillIns: newNumFillIns });
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
            fontSize: '1rem', // 设置标签字体大小
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
            fontSize: '1rem', // 设置标签字体大小
          },
        }}
      />

      <Flex justify="space-between" style={{ marginTop: '1rem' }}>
        <Button variant="light" color="blue" onClick={handleAddNumFillIn}>
          添加数字填空项
        </Button>
        <Button color="red" variant="outline" onClick={onDelete}>
          删除问题
        </Button>
      </Flex>
    </Flex>
  );
};

export default MultiNumFillIn;
