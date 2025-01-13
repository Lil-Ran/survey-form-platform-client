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
} from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import classes from '../styles/login.module.css';
import api, { ModifyPasswordModel } from '@Api'
import { showNotification } from '@mantine/notifications'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose } from '@mdi/js'

const ForgotPassword = () => {
  const [modifyPasswordData, setModifyPasswordData] = useState<ModifyPasswordModel>({
    email: '',
    emailCode: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (modifyPasswordData.email.length === 0 || modifyPasswordData.email.split('@').length !== 2) {
      showNotification({
        color: 'red',
        message: '邮箱格式错误',
        icon: <Icon path={mdiClose} size={1} />,
      })
      return
    }

    try {
      await api.account.accountVerifyCreate({email: modifyPasswordData.email})
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

  const handleModifyPassword = async () => {
    if (modifyPasswordData.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      await api.account.accountModifyPasswordCreate(modifyPasswordData)
      showNotification({
        color: 'teal',
        message: '重置密码成功',
        icon: <Icon path={mdiCheck} size={1} />,
      })
      void navigate('/login')
    } catch (error) {
      const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || '重置密码失败';
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
          重置密码{' '}
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
          <Anchor size="sm" component="button" style={{ color: '#1e90ff' }} onClick={() => { void navigate('/login'); }}>
            返回登录
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: '100%' }}>
          <TextInput
            label="邮箱"
            placeholder="请输入您的邮箱"
            required
            value={modifyPasswordData.email}
            onChange={(e) =>
              setModifyPasswordData({ ...modifyPasswordData, email: e.target.value })
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
            value={modifyPasswordData.emailCode}
            onChange={(e) =>
              setModifyPasswordData({ ...modifyPasswordData, emailCode: e.target.value })
            }
          />
          <PasswordInput
            label="密码"
            placeholder="请输入您的密码"
            required
            mt="md"
            value={modifyPasswordData.password}
            onChange={(e) =>
              setModifyPasswordData({ ...modifyPasswordData, password: e.target.value })
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
          <Button fullWidth mt="lg" onClick={() => { void handleModifyPassword(); }}>
            重置密码
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
