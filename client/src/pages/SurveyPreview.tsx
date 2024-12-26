import React from 'react';
import { Box, Text, TextInput, Flex } from '@mantine/core';
import { RowData } from './surveytable'; // 根据实际路径调整

interface SurveyPreviewProps {
  survey: RowData;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ survey }) => {
  return (
    <Box>
      <Text size="lg" fw={500} mb="md">
        {survey.title}
      </Text>
      <Text size="sm" mb="sm">
        创建时间: {survey.createTime}
      </Text>
      <Text size="sm" mb="sm">
        发布者: {survey.ownerName}
      </Text>
      <Text size="sm" mb="sm">
        状态: {survey.status}
      </Text>
      <Text size="sm" mb="sm">
        收集数量: {survey.responseCount}
      </Text>
      <Text size="sm" mb="sm">
        最后更新时间: {survey.lastUpdateTime}
      </Text>
      <Text size="sm" mb="sm">
        最后更新用户: {survey.lastUpdateUserName}
      </Text>
      {/* 这里可以根据需要添加更多问卷内容 */}
      <Flex direction="column" gap="sm">
        <TextInput
          label="问卷标题"
          value={survey.title}
          readOnly
        />
        {/* 根据问卷内容格式化显示 */}
        {/* 示例：显示问卷问题 */}
        {survey.questions && survey.questions.map((question: any, index: number) => (
          <Box key={index} mt="md">
            <Text size="md">
              {question.Title}
            </Text>
            <Text size="sm" color="dimmed">
              {question.Explanation}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SurveyPreview;
