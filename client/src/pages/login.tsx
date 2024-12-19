import React, { useState } from 'react';
import { Anchor, Button, TextInput, Text, Title, Box, Group } from '@mantine/core';
import { User } from '../models/LoginModel';
import {
  containerStyle,
  boxStyle,
  titleStyle,
  subtitleStyle,
  hintStyle,
  inputGroupStyle,
  inputStyle,
  buttonGroupStyle,
  buttonStyle,
} from '../styles/LoginStyles';

const user: User = {
  username: 'admin',
  password: '12345',
};

const Content = {
  "title": "欢迎登录",
  "subtitle": "survey-form",
  "hint": "如果没有账户，请",
  "contactAdmin": "联系管理员"
};


// 登录组件
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <div style={containerStyle}>
      <Box style={boxStyle}>
        {/* 标题 */}
        <Title align="center" style={titleStyle}>
          {Content.title}{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: '#6c5ce7', to: '#a29bfe' }}
            style={subtitleStyle}
          >
            {Content.subtitle}
          </Text>
        </Title>

        {/* 提示信息 */}
        <Text style={hintStyle}>
          {Content.hint}{' '}
          <Anchor href="#" size="sm" weight={500}>
            {Content.contactAdmin}
          </Anchor>
        </Text>

        <Box style={{ marginTop: 30, textAlign: 'center' }}>
          {/* 用户名输入框 */}
          <Group style={inputGroupStyle}>
            <TextInput
              placeholder="请输入用户名"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.currentTarget.value)
              }
              radius="md"
              required
              style={inputStyle}
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
            style={inputStyle}
          />
          {/* 登录按钮 */}
          <Group style={buttonGroupStyle}>
            <Button
              type="submit"
              radius="md"
              onClick={handleLogin}
              style={buttonStyle}
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