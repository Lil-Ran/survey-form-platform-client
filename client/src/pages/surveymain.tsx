import { useState, Suspense, useEffect } from 'react';
import { Title } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useLocation } from 'react-router-dom'; 
import MainLinks from '../components/Main/mainlinks';
import Links from '../components/Main/links';
import SurveyTable from '../components/Survey/surveytable';
import AnswerTable from '../components/Survey/answertable'; // 引入 AnswerTable 组件
import SurveyAnalysis from '../components/Survey/surveyanalysis'; // 引入 SurveyAnalysis 组件
import classes from '../styles/SurveyMainStyles.module.css';

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

  interface LocationState {
    surveyId?: string;
    mainLink?: string;
  }
  
  useEffect(() => {
    const state = location.state as LocationState;

    if (state?.mainLink === 'answerCenter' || state?.mainLink === 'surveyAnalysis') {
      setActive(state.mainLink === 'answerCenter' ? '答卷中心' : '问卷分析');
      setActiveLinksKey(state.mainLink);
      if (state?.surveyId) {
        const survey = answerCenter.find(s => s.id === state.surveyId);
        if (survey) {
          setActiveLink({ id: survey.id, name: survey.name }); // 确保获取到问卷的 ID 和名称
        }
      }
    }
  }, [location.state, answerCenter]);

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
            <Links activeLinksKey={activeLinksKey} activeLink={activeLink} setActiveLink={setActiveLink} answerCenter={answerCenter} />
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