import React, { useState, JSX } from 'react';
import { Tooltip, UnstyledButton, Title } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconHome2, IconDeviceDesktopAnalytics, IconCalendarStats, IconUser, IconSettings } from '@tabler/icons-react';
import classes from '../styles/SurveyMainStyles.module.css';
import { TableSort } from './surveytable.tsx'; // 导入 surveytask 组件

interface MainLink {
  icon: React.ElementType;
  label: string;
  linksKey: string; // 添加 linksKey 属性
}

const mainLinksMockdata: MainLink[] = [
  { icon: IconHome2 as React.ElementType, label: '问卷中心', linksKey: 'surveyCenter' },
  { icon: IconDeviceDesktopAnalytics as React.ElementType, label: '答卷中心', linksKey: 'answerCenter' },
  { icon: IconCalendarStats as React.ElementType, label: '问卷分析', linksKey: 'surveyAnalysis' },
  { icon: IconUser as React.ElementType, label: '账户管理', linksKey: 'accountManagement' },
  { icon: IconSettings as React.ElementType, label: '设置', linksKey: 'settings' },
];

interface LinksMockData {
  [key: string]: string[];
}

const linksMockData: LinksMockData = {
  surveyCenter: ['所有问卷','等待收集','正在收集', '停止收集'],
  answerCenter: ['答卷1', '答卷2'],
  surveyAnalysis: ['分析1', '分析2'],
  accountManagement: ['用户信息', '账号密码'],
  settings: ['设置1', '设置2','留待组会讨论'],
};

export function DoubleNavbar() {
  const [active, setActive] = useState(mainLinksMockdata[0].label);
  const [activeLinksKey, setActiveLinksKey] = useState(mainLinksMockdata[0].linksKey);
  const [activeLink, setActiveLink] = useState<string | null>('所有问卷'); // 初始化为“所有问卷”

  const handleMainLinkClick = (link: MainLink) => {
    setActive(link.label);
    setActiveLinksKey(link.linksKey);
    if (link.linksKey === 'surveyCenter') {
      setActiveLink('所有问卷'); // 点击“问卷中心”时，自动设置为“所有问卷”
    } else {
      setActiveLink(null); // 重置 activeLink 状态
    }
  };

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => handleMainLinkClick(link)} // 使用 handleMainLinkClick 函数
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links: JSX.Element[] = linksMockData[activeLinksKey].map((link: string) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        setActiveLink(link); // 更新 activeLink 状态
      }}
      key={link}
    >
      {link}
    </a>
  ));

  const getFilteredData = () => {
    switch (activeLink) {
      case '所有问卷':
        return (row: { status: string }) => row.status !== 'Deleted';
      case '等待收集':
        return (row: { status: string }) => row.status === 'Locked';
      case '正在收集':
        return (row: { status: string }) => row.status === 'Ongoing';
      case '停止收集':
        return (row: { status: string }) => ['Suspended', 'OutOfTime', 'OutOfCount'].includes(row.status);
      default:
        return () => true;
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
            {mainLinks}
          </div>
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>
            {links}
          </div>
        </div>
      </nav>
      <div className={classes.content} style={{ flex: 1 }}>
        {activeLinksKey === 'surveyCenter' && <TableSort filter={getFilteredData()} />}
      </div>
    </div>
  );
}

export default DoubleNavbar;