import { useState, Suspense, useEffect, useCallback } from 'react';
import { Title } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useLocation } from 'react-router-dom';

interface LocationState {
  mainLink?: string;
  surveyId?: string;
}
import MainLinks from '../components/Main/mainlinks';
import Links from '../components/Main/links';
import SurveyTable from '../components/Survey/surveytable';
import AnswerTable from '../components/Survey/answertable'; // 引入 AnswerTable 组件
import SurveyAnalysis from '../components/Survey/surveyanalysis'; // 引入 SurveyAnalysis 组件
import classes from '../styles/SurveyMainStyles.module.css';
import api from '@Api';

export function DoubleNavbar() {
  const [active, setActive] = useState('问卷中心');
  const [activeLinksKey, setActiveLinksKey] = useState('surveyCenter');
  const [activeLink, setActiveLink] = useState<{ id: string, name: string } | null>(null);
  const [answerCenter, setAnswerCenter] = useState<{ id: string, name: string }[]>([]);
  const [analysisCenter, setAnalysisCenter] = useState<{ id: string, name: string }[]>([]);
  const location = useLocation(); 

  const handleMainLinkClick = (link: { label: string, linksKey: string }) => {
    setActive(link.label);
    setActiveLinksKey(link.linksKey);
    if (link.linksKey === 'surveyCenter') {
      setActiveLink(null);
    } else {
      setActiveLink(null);
    }
  };

  const fetchSurveys = useCallback(async () => {
    try {
      const response = await api.surveyManage.surveyList();
      if (response.status === 200 && Array.isArray(response.data.data)) {
        const surveys = response.data.data
          .filter((survey: { status: string }) => survey.status !== 'Deleted')
          .map((survey: { title: string, surveyId: string }) => ({
            name: survey.title,
            id: survey.surveyId
          }));
        setAnswerCenter(surveys);
        setAnalysisCenter(surveys);
      } else {
        console.error('Unexpected response data format:', response);
      }
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
    }
  }, []);

  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.mainLink === 'answerCenter' || state?.mainLink === 'surveyAnalysis') {
      if (state?.surveyId) {
        fetchSurveys()
          .then(() => {
            if (state.mainLink === 'answerCenter') {
              setActive('答卷中心');
              setActiveLinksKey(state.mainLink);
              const survey = answerCenter.find(s => s.id === state.surveyId);
              if (survey) {
                setActiveLink({ id: survey.id, name: survey.name }); // 确保获取到问卷的 ID 和名称
              }
            } else if (state.mainLink === 'surveyAnalysis') {
              setActive('问卷分析');
              setActiveLinksKey(state.mainLink);
              const survey = analysisCenter.find(s => s.id === state.surveyId);
              if (survey) {
                setActiveLink({ id: survey.id, name: survey.name }); // 确保获取到问卷的 ID 和名称
              }
            }
          })
          .catch(error => {
            console.error('Failed to fetch surveys:', error);
          });
      }
    }
  }, [location.state]);

  const getFilteredData = () => {
    switch (activeLink?.name) {
      case '所有问卷':
        return (row: { status: string }) => row.status !== 'Deleted';
      case '等待收集':
        return (row: { status: string }) => row.status === 'Locked';
      case '正在收集':
        return (row: { status: string }) => row.status === 'Ongoing';
      case '停止收集':
        return (row: { status: string }) => ['Suspended', 'OutOfTime', 'OutOfCount'].includes(row.status);
      default:
        return (row: { status: string }) => row.status !== 'Deleted';
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <nav className={classes.navbar}>
        <div className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>
              <MantineLogo type="mark" size={30} />
            </div>
            <MainLinks active={active} handleMainLinkClick={handleMainLinkClick} setAnswerCenter={setAnswerCenter} setAnalysisCenter={setAnalysisCenter} />
          </div>
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>
            <Links activeLinksKey={activeLinksKey} activeLink={activeLink} setActiveLink={setActiveLink} answerCenter={answerCenter} analysisCenter={analysisCenter} />
          </div>
        </div>
      </nav>
      <div className={classes.content} style={{ flex: 1, overflowY: 'auto' }}>
        <Suspense fallback={<div>加载中...</div>}>
          {activeLinksKey === 'surveyCenter' && <SurveyTable filter={getFilteredData()} handleMainLinkClick={handleMainLinkClick} setActiveLink={(link: string) => setActiveLink({ id: link, name: link })} />}
          {activeLinksKey === 'answerCenter' && activeLink && <AnswerTable surveyId={activeLink.id} />}
          {activeLinksKey === 'surveyAnalysis' && activeLink && <SurveyAnalysis surveyId={activeLink.id} />}
        </Suspense>
      </div>
    </div>
  );
}

export default DoubleNavbar;