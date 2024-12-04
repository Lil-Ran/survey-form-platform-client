import {
  Anchor,
  Button,
  TextInput,
  PasswordInput,
  Text,
  Title,
  Box,
  Group,
} from '@mantine/core';
import { FC, useState } from 'react';

// 使用 useState 钩子来创建两个状态变量：username 和 password。
// setUsername 和 setPassword 是用来更新这两个状态变量的函数。
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ToDO 登录逻辑
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
        height: '100vh', // 使容器高度占满整个视口
        backgroundColor: '#2c3e50', // 背景颜色
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: '400px', // 设置最大宽度
          padding: '2rem', // 内边距
          backgroundColor: 'white', // 背景颜色
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // 阴影效果
          borderRadius: '8px', // 圆角
        }}
      >
        <Title
          align="center"
          style={{
            marginBottom: '1rem',
            fontFamily: 'Roboto, sans-serif', // 字体美化
          }}
        >
          欢迎登录{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: '#6c5ce7', to: '#a29bfe' }} // 标题渐变色
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

        {/* 登录表单 */}
        <Box style={{ marginTop: 30, textAlign: 'center' }}>
          <Group style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <TextInput
              placeholder="请输入用户名"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.currentTarget.value)
              }
              radius="md"
              required
              style={{ margin: '0 auto', width: '90%' }} // 调整宽度
            />
          </Group>
          <TextInput
            placeholder="请输入密码"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
            radius="md"
            required
            type="password" // 设置输入类型为密码，默认隐藏输入
            style={{ margin: '1rem auto', width: '90%' }} // 调整宽度
            
          />
          <Group
            style={{
              display: 'flex', // 使用 flex 布局
              justifyContent: 'center', // 居中对齐
              marginTop: '1rem',
            }}
          >
            <Button
              type="submit"
              radius="md"
              onClick={handleLogin}
              style={{ backgroundColor: 'orange', width: '160px' }} // 调整颜色为橘黄色
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
