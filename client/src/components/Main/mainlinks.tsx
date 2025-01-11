import { useMemo, useCallback } from 'react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from '../../styles/SurveyMainStyles.module.css';
import api from '@Api';
import surveyCenter from '/surveyCenter.svg';
import answerCenter from '/answerCenter.svg';
import surveyAnalysis from '/analysisCenter.svg';
import accountManagement from '/accountManagement.svg';
import setting from '/setting.svg';

interface MainLink {
  icon: string;
  label: string;
  linksKey: string;
}

const mainLinksMockdata: MainLink[] = [
  { icon: surveyCenter, label: '问卷中心', linksKey: 'surveyCenter' },
  { icon: answerCenter, label: '答卷中心', linksKey: 'answerCenter' },
  { icon: surveyAnalysis, label: '问卷分析', linksKey: 'surveyAnalysis' },
  { icon: accountManagement, label: '账户管理', linksKey: 'accountManagement' },
  { icon: setting, label: '设置', linksKey: 'settings' },
];

const MainLinks = ({ active, handleMainLinkClick, setAnswerCenter, setAnalysisCenter }: { active: string, handleMainLinkClick: (link: MainLink) => void, setAnswerCenter: (surveys: { id: string, name: string }[]) => void, setAnalysisCenter: (surveys: { id: string, name: string }[]) => void }) => {
  const handleLinkClick = useCallback(async (link: MainLink) => {
    if (link.linksKey === 'answerCenter' || link.linksKey === 'surveyAnalysis') {
      try {
        const response = await api.surveyManage.surveyList();
        if (Array.isArray(response.data.data)) {
          const surveys = response.data.data
            .filter((survey: { status: string }) => survey.status !== 'Deleted')
            .map((survey: { title: string, surveyId: string }) => ({
              name: survey.title,
              id: survey.surveyId
            }));
            if (link.linksKey === 'answerCenter' ){
                setAnswerCenter(surveys);
            }else{
                setAnalysisCenter(surveys);
            }
          
        } else {
          console.error('Unexpected response data format:', response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch survey list:', error);
      }
    }
    handleMainLinkClick(link);
  }, [handleMainLinkClick, setAnswerCenter,setAnalysisCenter]);

  const mainLinks = useMemo(() => mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => { void handleLinkClick(link); }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <img src={link.icon} alt={link.label} />
      </UnstyledButton>
    </Tooltip>
  )), [active, handleLinkClick]);

  return <>{mainLinks}</>;
};

export default MainLinks;


