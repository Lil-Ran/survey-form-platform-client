import { useState, lazy, Suspense } from 'react';
import { Title } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import MainLinks from '../components/Main/mainlinks';
import Links from '../components/Main/links';
import classes from '../styles/SurveyMainStyles.module.css';

// 懒加载 TableSort 组件
const TableSort = lazy(() => import('../components/Survey/surveytable.tsx'));

export function DoubleNavbar() {
  const [active, setActive] = useState('问卷中心');
  const [activeLinksKey, setActiveLinksKey] = useState('surveyCenter');
  const [activeLink, setActiveLink] = useState<string | null>('所有问卷');

  const handleMainLinkClick = (link: { label: string, linksKey: string }) => {
    setActive(link.label);
    setActiveLinksKey(link.linksKey);
    if (link.linksKey === 'surveyCenter') {
      setActiveLink('所有问卷');
    } else {
      setActiveLink(null);
    }
  };

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
            <MainLinks active={active} handleMainLinkClick={handleMainLinkClick} />
          </div>
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>
            <Links activeLinksKey={activeLinksKey} activeLink={activeLink} setActiveLink={setActiveLink} />
          </div>
        </div>
      </nav>
      <div className={classes.content} style={{ flex: 1 }}>
        <Suspense fallback={<div>加载中...</div>}>
          {activeLinksKey === 'surveyCenter' && <TableSort filter={getFilteredData()} />}
        </Suspense>
      </div>
    </div>
  );
}

export default DoubleNavbar;