import { IconArrowLeft } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/forgotpassword.module.css';

export function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size={1000} my={30}>
        <Title className={classes.title} ta="center" style={{ color: '#001f3f', fontSize: '2rem' }}>
          忘记您的密码?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          请输入邮箱获得重置密码链接
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="邮箱" placeholder="请输入您的邮箱" required />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => {void navigate('/login')}}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>返回登录页面</Box>
              </Center>
            </Anchor>
            <Button className={classes.control}>重设密码</Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}

export default ForgotPassword;