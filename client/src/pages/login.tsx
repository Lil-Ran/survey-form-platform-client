import {
  Anchor,
  Button,
  TextInput,
  Text,
  Title,
  Box,
  Group,
} from '@mantine/core';
import { useState } from 'react';

// 登录组件
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 登录逻辑
  // Todo 连接后端接口
  const handleLogin = () => {
    if (username.trim() === 'admin' && password === '12345') {
      alert('登录成功！');
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2c3e50',
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        {/* 标题 */}
        <Title
          align="center"
          style={{
            marginBottom: '1rem',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          欢迎登录{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: '#6c5ce7', to: '#a29bfe' }}
            style={{
              fontWeight: 'bold',
            }}
          >
            survey-form
          </Text>
        </Title>

        {/* 提示信息 */}
        <Text color="dimmed" size="sm" align="center">
          如果没有账户，请{' '}
          <Anchor href="#" size="sm" weight={500}>
            联系管理员
          </Anchor>
        </Text>

        <Box style={{ marginTop: 30, textAlign: 'center' }}>
          {/* 用户名输入框 */}
          <Group style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <TextInput
              placeholder="请输入用户名"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.currentTarget.value)
              }
              radius="md"
              required
              style={{ margin: '0 auto', width: '90%' }}
            />
          </Group>
          {/* 密码输入框 */}
          <TextInput
            placeholder="请输入密码"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
            radius="md"
            required
            type="password"
            style={{ margin: '1rem auto', width: '90%' }}
          />
          {/* 登录按钮 */}
          <Group
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <Button
              type="submit"
              radius="md"
              onClick={handleLogin}
              style={{ backgroundColor: 'orange', width: '160px' }}
            >
              登录
            </Button>
          </Group>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
