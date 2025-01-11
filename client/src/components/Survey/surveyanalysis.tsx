import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Center } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import api, { QuestionModel, QuestionResponseModel } from '@Api';
import { SurveyResponseModel } from '../../models/SurveyMetaModel';

interface SurveyAnalysisProps {
  surveyId: string;
}

const SurveyAnalysis: React.FC<SurveyAnalysisProps> = ({ surveyId }) => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [questionResponses, setQuestionResponses] = useState<QuestionResponseModel[]>([]);
  const [responses, setResponses] = useState<SurveyResponseModel[]>([]);

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

    const fetchResponses = async () => {
      try {
        const response = await api.responseDetail.surveyDetail(surveyId);
        if (response.status === 200 && Array.isArray(response.data)) {
          setResponses(response.data as unknown as SurveyResponseModel[]);
        } else {
          console.error('Unexpected response data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch responses:', error);
      }
    };

    void fetchQuestions();
    void fetchResponses();
  }, [surveyId]);

  const renderChart = (question: QuestionModel) => {
    const data = {
      labels: question.Options.map(option => option.OptionContent),
      datasets: [
        {
          data: question.Options.map(option => responses.filter(response => response.QuestionResponses?.some(qr => qr.Options?.some(o => o.OptionID === option.OptionID)) ?? false).length),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };

    return <PieChart type="pie" data={data} />;
  };

  return (
    <Box>
      {questions.map((question) => (
        <Box key={question.QuestionID} mb="md">
          <Text fw={500} mb="xs">{question.Title}</Text>
          {question.QuestionType === 'SingleChoice' || question.QuestionType === 'MultiChoice' ? (
            <Center>
              {renderChart(question)}
            </Center>
          ) : (
            <Text>其他类型的题目分析</Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

SurveyAnalysis.propTypes = {
  surveyId: PropTypes.string.isRequired,
};

export default SurveyAnalysis;
