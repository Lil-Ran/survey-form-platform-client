import React from 'react';
import { TextInput, NumberInput, Flex, Button} from '@mantine/core';
import { QuestionModel, Option } from '../../models/QuestionModel';

interface MultiChoiceProps {
  question: QuestionModel; // 当前问题数据
  onUpdate: (updatedQuestion: QuestionModel) => void; // 更新问题回调
  onDelete: () => void; // 删除问题回调
}

const MultiChoice: React.FC<MultiChoiceProps> = ({ question, onUpdate, onDelete }) => {
  const handleTitleChange = (title: string) => {
    onUpdate({ ...question, Title: title });
  };

  const handleExplanationChange = (explanation: string) => {
    onUpdate({ ...question, Explanation: explanation });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = question.Options.map((option, i) =>
      i === index ? { ...option, OptionContent: value } : option
    );
    onUpdate({ ...question, Options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOption: Option = {
      OptionContent: '',
      OptionID: Math.random().toString(36).substr(2, 9), // 生成随机 ID
    };
    onUpdate({ ...question, Options: [...question.Options, newOption] });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = question.Options.filter((_, i) => i !== index);
    onUpdate({ ...question, Options: updatedOptions });
  };

  const handleMinChoiceChange = (value: string | number) => {
    const numericValue = typeof value === 'number' ? value : 0; // 将字符串转换为数字或设置默认值
    onUpdate({ ...question, LeastChoice: numericValue });
  };
  
  const handleMaxChoiceChange = (value: string | number) => {
    const numericValue = typeof value === 'number' ? value : question.Options.length;
    onUpdate({ ...question, MaxChoice: numericValue });
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

        {/* 说明 */}
        <TextInput
          label="问题说明"
          value={question.Explanation}
          onChange={(e) => handleExplanationChange(e.target.value)}
          placeholder="可选：填写问题说明"
          style={{ marginTop: '0.5rem' }}
          labelProps={{
            style: {
              fontSize: '1rem', // 设置标签字体大小
            },
          }}
        />

        {/* 最少选择数 */}
        <NumberInput
          label="最少选择数"
          value={question.LeastChoice}
          onChange={handleMinChoiceChange}
          min={0}
          max={question.Options.length}
          style={{ marginTop: '0.5rem' }}
          labelProps={{
            style: {
              fontSize: '1rem', // 设置标签字体大小
            },
          }}
        />

        {/* 最多选择数 */}
        <NumberInput
          label="最多选择数"
          value={question.MaxChoice}
          onChange={handleMaxChoiceChange}
          min={0}
          max={question.Options.length}
          style={{ marginTop: '0.5rem' }}
          labelProps={{
            style: {
              fontSize: '1rem', // 设置标签字体大小
            },
          }}
        />

        {/* 选项列表 */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 500 }}>选项</div>
          {question.Options.map((option, index) => (
            <Flex key={option.OptionID} justify="space-between" align="center" style={{ marginBottom: '0.5rem' }}>
              <TextInput
                value={option.OptionContent}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`选项 ${index + 1}`}
                style={{ flexGrow: 1, marginRight: '0.5rem' }}
              />
              <Button color="red" size="xs" onClick={() => handleRemoveOption(index)}>
                删除
              </Button>
            </Flex>
          ))}
        </div>

        {/* 按钮容器 */}
        <Flex justify="space-between" style={{ marginTop: '1rem' }}>
          {/* 添加选项按钮 */}
          <Button variant="light" color="blue" onClick={handleAddOption}>
            添加选项
          </Button>

          {/* 删除问题按钮 */}
          <Button color="red" variant="outline" onClick={onDelete}>
            删除问题
          </Button>
        </Flex>
      </Flex>
  );
};

export default MultiChoice;
