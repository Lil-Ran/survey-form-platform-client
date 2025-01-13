import React, { useEffect, useState } from 'react'
import {
  Anchor,
  Button,
  // Checkbox,
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
import api from "@Api"
import { showNotification } from '@mantine/notifications'
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js'
import useUser from '@Utils/useUser.tsx'
import { useSearchParams } from 'react-router'

// 登录组件
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [params, ] = useSearchParams()
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)
  const [needRedirect, setNeedRedirect] = useState(false)

  const { user, mutate } = useUser()

  useEffect(() => {
    if (needRedirect && user) {
      setNeedRedirect(false)
      setTimeout(() => {
        void navigate(params.get('from') ?? '/surveymain')
      }, 200)
    }
  }, [user, needRedirect, navigate, params])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    if (username.length === 0 || password.length < 6) {
      showNotification({
        color: 'red',
        message: '邮箱或密码长度不足',
        icon: <Icon path={mdiClose} size={1} />,
      })
      setDisabled(false)
      return
    }

    setDisabled(true)

    try {
      await api.account.accountLoginCreate({
        userName: username,
        password: password,
      })

      showNotification({
        id: 'login-status',
        color: 'teal',
        message: '登录成功',
        icon: <Icon path={mdiCheck} size={1} />,
        autoClose: true,
        loading: false,
      })
      setNeedRedirect(true)
      setTimeout(() => {}, 500)
      void mutate()
    } catch (err) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message || '登录失败，请重试';
      showNotification({
        id: 'login-status',
        color: 'red',
        title: '出错了',
        message: errorMessage,
        icon: <Icon path={mdiClose} size={1} />,
        autoClose: true,
        loading: false,
      })
    } finally {
      setDisabled(false)
    }
  }

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
            disabled={disabled}
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
            disabled={disabled}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />
          <Button fullWidth mt="xl" disabled={disabled} onClick={(event) => { void handleLogin(event); }}>
            登录
          </Button>
          <Group justify="end" mt="lg">
            {/*<Checkbox label="自动登录" />*/}
            <Anchor component="button" size="sm" onClick={()=>{void navigate('/forgotpassword');}}>
              忘记密码?
            </Anchor>
          </Group>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;




