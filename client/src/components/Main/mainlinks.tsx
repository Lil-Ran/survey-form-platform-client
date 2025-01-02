import { useMemo } from 'react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from '../../styles/SurveyMainStyles.module.css';
import { mdiCalendar, mdiHome, mdiHomeAnalytics, mdiHuman, mdiSettingsHelper } from '@mdi/js';
import Icon from '@mdi/react';

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

const MainLinks = ({ active, handleMainLinkClick }: { active: string, handleMainLinkClick: (link: MainLink) => void }) => {
  const mainLinks = useMemo(() => mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => handleMainLinkClick(link)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <Icon path={link.icon} />
      </UnstyledButton>
    </Tooltip>
  )), [active]);

  return <>{mainLinks}</>;
};

export default MainLinks;
