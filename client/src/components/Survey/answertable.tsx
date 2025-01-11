import { useState, useMemo, useEffect } from 'react';
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
import api, { QuestionModel, ResponseModel, QuestionResponseModel } from '@Api';

interface AnswerTableProps {
  surveyId: string;
}

const AnswerTable: React.FC<AnswerTableProps> = ({ surveyId }) => {
  const [data, setData] = useState<ResponseModel[]>([]);
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
      try {
        const response = await api.responseDetail.surveyDetail(surveyId);
        if (response.status === 200 && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Unexpected response data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      }
    };

    void fetchQuestions();
    void fetchAnswers();
  }, [surveyId]);

  const paginatedData = useMemo(() => data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage), [data, activePage, itemsPerPage]);

  const renderAnswer = (questionResponse: QuestionResponseModel) => {
    switch (questionResponse.QuestionType) {
      case 'SingleChoice':
      case 'MultiChoice':
        return questionResponse.Options.filter(option => option.IsSelect).map(option => option.OptionContent).join(', ');
      case 'SingleNumFillIn':
      case 'MultiNumFillIn':
        return questionResponse.NumFillIns.map(numFillIn => numFillIn.NumContent).join(', ');
      case 'SingleTextFillIn':
      case 'MultiTextFillIn':
        return questionResponse.TextFillIns.map(textFillIn => textFillIn.TextContent).join(', ');
      default:
        return '';
    }
  };

  const rows = useMemo(() => paginatedData.map((response, index) => (
    <Table.Tr key={index}>
      <Table.Td>{response.ResponseID}</Table.Td>
      {questions.map((question) => {
        const questionResponse = response.QuestionResponse.find(qr => qr.QuestionID === question.QuestionID);
        return (
          <Table.Td key={question.QuestionID}>
            {questionResponse ? renderAnswer(questionResponse) : '无回答'}
          </Table.Td>
        );
      })}
    </Table.Tr>
  )), [paginatedData, questions]);



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
            rows
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

