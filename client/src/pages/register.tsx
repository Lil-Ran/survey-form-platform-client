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
import api, { RegisterModel } from '@Api'
import { showNotification } from '@mantine/notifications'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose } from '@mdi/js'

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterModel>({
    email: '',
    emailCode: '',
    password: '',
    userName: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (registerData.email.length === 0 || registerData.email.split('@').length !== 2) {
      showNotification({
        color: 'red',
        message: '邮箱格式错误',
        icon: <Icon path={mdiClose} size={1} />,
      })
      return
    }

    try {
      await api.account.accountVerifyCreate({email: registerData.email})
      showNotification({
        color: 'teal',
        message: '邮箱验证码发送成功',
        icon: <Icon path={mdiCheck} size={1} />,
      })
    } catch (err) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message || '邮箱验证码发送失败';
      showNotification({
        color: 'red',
        title: '出错了',
        message: errorMessage,
        icon: <Icon path={mdiClose} size={1} />,
      })
    }
  }

  const handleRegister = async () => {
    if (registerData.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      await api.account.accountRegisterCreate(registerData)
      showNotification({
        color: 'teal',
        message: '注册成功',
        icon: <Icon path={mdiCheck} size={1} />,
      })
      void navigate('/login')
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || '注册失败';
      showNotification({
        color: 'red',
        title: '出错了',
        message: errorMessage,
        icon: <Icon path={mdiClose} size={1} />,
      })
    }
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size="lg" my={40} style={{ width: '100%', maxWidth: '500px' }}>
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
            value={registerData.userName}
            onChange={(e) =>
              setRegisterData({ ...registerData, userName: e.target.value })
            }
          />
          <TextInput
            label="邮箱"
            placeholder="请输入您的邮箱"
            required
            mt="md"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <Button fullWidth variant='subtle' onClick={() => { void handleSendEmail(); }}>
            发送邮箱验证码
          </Button>
          <TextInput
            label="邮箱验证码"
            placeholder="请输入邮箱验证码"
            required
            mt="md"
            value={registerData.emailCode}
            onChange={(e) =>
              setRegisterData({ ...registerData, emailCode: e.target.value })
            }
          />
          <PasswordInput
            label="密码"
            placeholder="请输入您的密码"
            required
            mt="md"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <PasswordInput
            label="确认密码"
            placeholder="请再次输入您的密码"
            required
            mt="md"
            value={confirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(event.currentTarget.value)
            }
            error={passwordError ? '两次输入的密码不一致' : null}
          />
          <Button fullWidth mt="lg" onClick={() => { void handleRegister(); }}>
            注册
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
