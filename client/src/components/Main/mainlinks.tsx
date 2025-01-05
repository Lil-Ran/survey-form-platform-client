import { useMemo,useCallback } from 'react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from '../../styles/SurveyMainStyles.module.css';
import { mdiCalendar, mdiHome, mdiHomeAnalytics, mdiHuman, mdiSettingsHelper } from '@mdi/js';
import Icon from '@mdi/react';
import api from '@Api';

interface MainLink {
  icon: string;
  label: string;
  linksKey: string;
}

const mainLinksMockdata: MainLink[] = [
  { icon: mdiHome, label: '问卷中心', linksKey: 'surveyCenter' },
  { icon: mdiHomeAnalytics, label: '答卷中心', linksKey: 'answerCenter' },
  { icon: mdiCalendar, label: '问卷分析', linksKey: 'surveyAnalysis' },
  { icon: mdiHuman, label: '账户管理', linksKey: 'accountManagement' },
  { icon: mdiSettingsHelper, label: '设置', linksKey: 'settings' },
];


const MainLinks = ({ active, handleMainLinkClick, setAnswerCenter }: { active: string, handleMainLinkClick: (link: MainLink) => void, setAnswerCenter: (surveys: { name: string }[]) => void }) => {
  const handleAnswerCenterClick = useCallback(async (link: MainLink) => {
      if (link.linksKey === 'answerCenter') {
        try {
          const response = await api.surveyManage.surveyList();
          if (Array.isArray(response.data.data)) {
            const surveys = response.data.data.map((survey: { title: string, surveyId:string}) => ({
              name: survey.title,
              id: survey.surveyId
            }));
            setAnswerCenter(surveys);
          } else {
            console.error('Unexpected response data format:', response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch survey list:', error);
        }
      }
      handleMainLinkClick(link);
    }, [handleMainLinkClick, setAnswerCenter]);
  
    const mainLinks = useMemo(() => mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => { void handleAnswerCenterClick(link); }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <Icon path={link.icon} />
      </UnstyledButton>
    </Tooltip>
  )), [active, handleAnswerCenterClick]);

  return <>{mainLinks}</>;
};

export default MainLinks;


