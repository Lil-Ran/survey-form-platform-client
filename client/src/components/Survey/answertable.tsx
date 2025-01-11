import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Center,
  ScrollArea,
  Table,
  Text,
  Pagination,
  Tooltip,
} from '@mantine/core';
import classes from '../../styles/surveyTable.module.css';
import api, { QuestionModel } from '@Api';
import { SurveyResponseModel } from '../../models/SurveyMetaModel';

interface AnswerTableProps {
  surveyId: string;
}

const AnswerTable: React.FC<AnswerTableProps> = ({ surveyId }) => {
  const [data] = useState<SurveyResponseModel[]>([]);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.questionEdit.editQuestionsDetail(surveyId);
        if (response.status === 200 && Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
        } else {
          console.error('Unexpected response data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    const fetchAnswers = async () => {
      // 模拟数据获取
      // try {
      //   const response = await api.responseDetail.surveyResponses(surveyId);
      //   if (response.status === 200 && Array.isArray(response.data.data)) {
      //     setData(response.data.data as unknown as SurveyResponseModel[]);
      //   } else {
      //     console.error('Unexpected response data format:', response);
      //   }
      // } catch (error) {
      //   console.error('Failed to fetch answers:', error);
      // }
    };

    void fetchQuestions();
    void fetchAnswers();
  }, [surveyId]);

  const paginatedData = useMemo(() => data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage), [data, activePage, itemsPerPage]);

  const rows = useMemo(() => paginatedData.map((response, index) => (
    <Table.Tr key={index}>
      <Table.Td>{response.id}</Table.Td>
      {response.questions.map((question, qIndex) => (
        <Table.Td key={qIndex}>{question.QuestionLabel}</Table.Td>
      ))}
    </Table.Tr>
  )), [paginatedData]);

  const handleColHover = useCallback(async (questionId: string) => {
    try {
      const response = await api.questionEdit.editQuestionsDetail(surveyId);
      if (response.status === 200 && Array.isArray(response.data.questions)) {
        const question = response.data.questions.find((q: QuestionModel) => q.QuestionID === questionId);
        if (question) {
          console.log('Question details:', question);
        }
      } else {
        console.error('Unexpected response data format:', response);
      }
    } catch (error) {
      console.error('Failed to fetch question details:', error);
    }
  }, [surveyId]);

  return (
    <ScrollArea>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" className={classes.table} striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>答卷编号</Table.Th>
            {questions.map((question, index) => (
              <Tooltip key={question.QuestionID} label={question.Title} withArrow>
                <Table.Th>问题 {index + 1}</Table.Th>
              </Tooltip>
            ))}
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <Table.Tr key={index} onMouseEnter={() => {if (row.key) { void handleColHover(row.key); }}}>
                {row}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={questions.length + 1}>
                <Text fw={500} ta="center">
                  暂无答卷
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Center mt="md">
        <Pagination
          total={Math.ceil(data.length / itemsPerPage)}
          value={activePage}
          onChange={setActivePage}
        />
      </Center>
    </ScrollArea>
  );
};

AnswerTable.propTypes = {
  surveyId: PropTypes.string.isRequired,
};

export default AnswerTable;
