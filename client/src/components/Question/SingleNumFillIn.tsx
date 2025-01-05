import React from 'react';
import { TextInput, Flex, Button } from '@mantine/core';
import { QuestionModel } from '../../models/QuestionModel';

interface SingleNumFillInProps {
  question: QuestionModel; // 问题数据
  onUpdate: (updatedQuestion: QuestionModel) => void; // 更新问题回调
  onDelete: () => void; // 删除问题回调
}

const SingleNumFillIn: React.FC<SingleNumFillInProps> = ({ question, onUpdate, onDelete }) => {
  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, Title: title });
  };

  const handleExplanationChange = (explanation: string) => {
    onUpdate({ ...question, Description: explanation });
  };

  return (
    <Flex direction="column" gap="sm">
      {/* 标题 */}
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

      {/* 问题说明 */}
      <TextInput
        label="问题说明"
        value={question.Description}
        onChange={(e) => handleExplanationChange(e.target.value)}
        placeholder="可选：请输入问题说明"
        labelProps={{
          style: {
            fontSize: '1rem', // 设置标签字体大小
          },
        }}
      />

      {/* 删除问题按钮 */}
      <Button color="red" variant="outline" onClick={onDelete} style={{ marginTop: '1rem' }}>
        删除问题
      </Button>
    </Flex>
  );
};

export default SingleNumFillIn;
