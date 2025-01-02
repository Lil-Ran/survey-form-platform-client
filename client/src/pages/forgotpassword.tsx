import React, { useState } from 'react';
import {
  Anchor,
  Button,
  Container,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/login.module.css';

export interface User {
  username: string;
  password: string;
  email: string;
}

// 忘记密码组件
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  // 忘记密码逻辑
  const handleForgotPassword = () => {
    //TODO 接入忘记密码API接口
    setEmailSent(true);
    alert('重置密码邮件已发送！');
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size="lg" my={40} style={{ width: '100%', maxWidth: '400px' }}>
        <Title ta="center" className={classes.title} style={{ color: '#001f3f' }}>
          忘记密码{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: '#6c5ce7', to: '#a29bfe' }}
          >
            survey-form
          </Text>
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} style={{ color: '#001f3f' }}>
          记得密码?{' '}
          <Anchor size="sm" component="button" style={{ color: '#1e90ff' }} onClick={() => { void navigate('/login'); }}>
            登录
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: '100%' }}>
          <TextInput
            label="邮箱"
            placeholder="请输入您的邮箱"
            required
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
          />
          <Button fullWidth mt="xl" onClick={handleForgotPassword}>
            发送重置邮件
          </Button>
          {emailSent && <Text ta="center" mt="md" style={{ color: '#28a745' }}>重置密码邮件已发送，请检查您的邮箱。</Text>}
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
