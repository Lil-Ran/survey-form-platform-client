import React, { useMemo } from 'react';
import classes from '../../styles/SurveyMainStyles.module.css';

const linksMockData: { [key: string]: string[] } = {
  surveyCenter: ['所有问卷','等待收集','正在收集', '停止收集'],
  answerCenter: ['答卷1', '答卷2'],
  surveyAnalysis: ['分析1', '分析2'],
  accountManagement: ['用户信息', '账号密码'],
  settings: ['设置1', '设置2','留待组会讨论'],
};

const Links = ({ activeLinksKey, activeLink, setActiveLink }: { activeLinksKey: string, activeLink: string | null, setActiveLink: (link: string) => void }) => {
  const links = useMemo(() => (linksMockData[activeLinksKey] || []).map((link: string) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  )), [activeLinksKey, activeLink]);

  return <>{links}</>;
};

export default Links;
