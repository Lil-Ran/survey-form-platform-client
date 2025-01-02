import React, { useMemo } from 'react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import { IconHome2, IconDeviceDesktopAnalytics, IconCalendarStats, IconUser, IconSettings } from '@tabler/icons-react';
import classes from '../../styles/SurveyMainStyles.module.css';

interface MainLink {
  icon: React.ElementType;
  label: string;
  linksKey: string;
}

const mainLinksMockdata: MainLink[] = [
  { icon: IconHome2 as React.ElementType, label: '问卷中心', linksKey: 'surveyCenter' },
  { icon: IconDeviceDesktopAnalytics as React.ElementType, label: '答卷中心', linksKey: 'answerCenter' },
  { icon: IconCalendarStats as React.ElementType, label: '问卷分析', linksKey: 'surveyAnalysis' },
  { icon: IconUser as React.ElementType, label: '账户管理', linksKey: 'accountManagement' },
  { icon: IconSettings as React.ElementType, label: '设置', linksKey: 'settings' },
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
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )), [active]);

  return <>{mainLinks}</>;
};

export default MainLinks;
