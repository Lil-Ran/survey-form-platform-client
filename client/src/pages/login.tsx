import React, { useState } from 'react';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/login.module.css';

export interface User {
  username: string;
  password: string;
}  

const user: User = {
  username: 'admin',
  password: '12345',
};

// 登录组件
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 登录逻辑
  const handleLogin = () => {
    //TODO 接入登录API接口
    if (username.trim() === user.username && password === user.password) {
      alert('登录成功！');
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size="lg" my={40} style={{ width: '100%', maxWidth: '400px' }}>
        <Title ta="center" className={classes.title} style={{ color: '#001f3f' }}>
          欢迎登录{' '}
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
          还没有账户?{' '}
          <Anchor size="sm" component="button" style={{ color: '#1e90ff' }} onClick={() => { void navigate('/register'); }}>
            创建账号
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: '100%' }}>
          <TextInput
            label="用户名/邮箱"
            placeholder="请输入您的用户名或邮箱"
            required
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.currentTarget.value)
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
          <Group justify="space-between" mt="lg">
            <Checkbox label="自动登录" />
            <Anchor component="button" size="sm" onClick={()=>{void navigate('/forgotpassword');}}>
              忘记密码?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleLogin}>
            登录
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;




