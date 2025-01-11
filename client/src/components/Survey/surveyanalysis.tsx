import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Center, Paper, Title } from '@mantine/core';
import api, { QuestionModel, ResponseModel, QuestionResponseModel } from '@Api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import WordCloud from 'react-wordcloud';

interface SurveyAnalysisProps {
  surveyId: string;
}

const SurveyAnalysis: React.FC<SurveyAnalysisProps> = ({ surveyId }) => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [responses, setResponses] = useState<ResponseModel[]>([]);

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
          setResponses(response.data as unknown as ResponseModel[]);
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

  const getQuestionResponses = (questionId: string) => {
    return responses.map(response => response.QuestionResponse.find(qr => qr.QuestionID === questionId)).filter(Boolean) as QuestionResponseModel[];
  };

  const renderChart = (question: QuestionModel) => {
    const questionResponses = getQuestionResponses(question.QuestionID);

    switch (question.QuestionType) {
      case 'SingleChoice':
      case 'MultiChoice': {
        const data = question.Options.map(option => ({
          name: option.OptionContent,
          value: questionResponses.filter(qr => qr.Options.some(o => o.OptionID === option.OptionID && o.IsSelect)).length,
        }));
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        console.log(data)
        return (
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }
      case 'SingleNumFillIn':
      case 'MultiNumFillIn': {
        const data = questionResponses.flatMap(qr => qr.NumFillIns.map((nf, index) => ({
          name: `回答 ${index + 1}`,
          value: nf.NumContent,
        })));
        return (
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }
      case 'SingleTextFillIn':
      case 'MultiTextFillIn': {
        const data = questionResponses.flatMap(qr => qr.TextFillIns.map(tf => ({
          text: tf.TextContent,
          value: 1,
        })));
        return (
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <WordCloud words={data} />
            </ResponsiveContainer>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Box>
      {questions.map((question) => (
        <Paper shadow="md" p="xl" radius="md" mb="md" key={question.QuestionID}>
          <Title order={3}>{question.Title}</Title>
          <Text size="sm" mb="xs">类型: {question.QuestionType}</Text>
          <Text size="sm" mb="xs">说明: {question.Description}</Text>
          <Center>
            {renderChart(question)}
          </Center>
        </Paper>
      ))}
    </Box>
  );
};

SurveyAnalysis.propTypes = {
  surveyId: PropTypes.string.isRequired,
};

export default SurveyAnalysis;
