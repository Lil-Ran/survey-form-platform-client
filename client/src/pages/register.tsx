import React, { useState } from 'react';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/login.module.css';
import api from '@Api';

export interface User {
  username: string;
  password: string;
  email: string;
}

// 注册组件
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  // 注册逻辑
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const newUser = {
        userName: username,
        password,
        email,
        emailCode: '123456', // 假设需要一个邮箱验证码
      };
      await api.account.accountRegisterCreate(newUser);
      alert('注册成功！');
      void navigate('/login');
    } catch (error) {
      console.error('Failed to register:', error);
      alert('注册失败，请重试！');
    }
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size="lg" my={40} style={{ width: '100%', maxWidth: '400px' }}>
        <Title ta="center" className={classes.title} style={{ color: '#001f3f' }}>
          创建账号{' '}
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
          已有账户?{' '}
          <Anchor size="sm" component="button" style={{ color: '#1e90ff' }} onClick={() => { void navigate('/login'); }}>
            登录
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: '100%' }}>
          <TextInput
            label="用户名"
            placeholder="请输入您的用户名"
            required
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.currentTarget.value)
            }
          />
          <TextInput
            label="邮箱"
            placeholder="请输入您的邮箱"
            required
            mt="md"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
          />
          <PasswordInput
            label="密码"
            placeholder="请输入您的密码"
            required
            mt="md"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />
          <PasswordInput
            label="确认密码"
            placeholder="请重新输入您的密码"
            required
            mt="md"
            value={confirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(event.currentTarget.value)
            }
            error={passwordError ? '两次输入的密码不一致' : null}
          />
          <Button fullWidth mt="xl" onClick={() => { void handleRegister(); }}>
            注册
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
