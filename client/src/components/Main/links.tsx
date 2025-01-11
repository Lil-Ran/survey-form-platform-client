import React, { useMemo, useCallback } from 'react';
import api from '@Api';
import classes from '../../styles/SurveyMainStyles.module.css';

const linksMockData: { [key: string]: string[] } = {
  surveyCenter: ['所有问卷','等待收集','正在收集', '停止收集'],
  answerCenter: [],
  surveyAnalysis: [],
  accountManagement: ['用户信息', '账号密码'],
  settings: ['设置1', '设置2','留待组会讨论'],
};

const Links = ({ activeLinksKey, activeLink, setActiveLink, answerCenter }: { activeLinksKey: string, activeLink: { id: string, name: string } | null, setActiveLink: (link: { id: string, name: string }) => void, answerCenter: { id: string, name: string }[] }) => {
  const handleSurveyClick = useCallback(async (surveyId: string, surveyName: string) => {
    try {
      const response = await api.respondentAccess.respondentQuestionsDetail(surveyId);
      console.log('Survey data:', response.data);
      setActiveLink({ id: surveyId, name: surveyName });
    } catch (error) {
      console.error('Failed to fetch survey data:', error);
    }
  }, [setActiveLink]);

  const links = useMemo(() => {
    if (activeLinksKey === 'answerCenter' || activeLinksKey === 'surveyAnalysis') {
      return (
        <div className={classes.scrollable}>
          {answerCenter.map((survey) => (
            <a
              className={classes.link}
              data-active={activeLink?.id === survey.id || undefined}
              href="#"
              onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
                void handleSurveyClick(survey.id, survey.name);
              }}
              key={survey.id}
            >
              {survey.name}
            </a>
          ))}
        </div>
      );
    }
    
    return (linksMockData[activeLinksKey] || []).map((link: string) => (
      <a
        className={classes.link}
        data-active={activeLink?.name === link || undefined}
        href="#"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
          setActiveLink({ id: '', name: link });
        }}
        key={link}
      >
        {link}
      </a>
    ));
  }, [activeLinksKey, activeLink, setActiveLink, answerCenter, handleSurveyClick]);

  return <>{links}</>;
};

export default Links;
