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
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classes from '../styles/login.module.css';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className={classes.wrapper} style={{ backgroundColor: '#e0f7fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container size={420} my={40}>
        <Text ta="center" className={classes.title} style={{ fontSize: '2rem' }} mt={10}>
          忘记您的密码?
        </Text>
        <Text color="dimmed" size="sm" style={{ textAlign: 'center' }} mt={5}>
          请输入邮箱获得重置密码链接
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl" style={{ borderWidth: '1px' }}>
          <TextInput 
            label="邮箱" 
            placeholder="请输入您的邮箱" 
            required 
            value={email} 
            onChange={handleEmailChange} 
          />
          <Group mt="lg" className={classes.controls} style={{ justifyContent: 'space-between' }}>
            <Anchor color="dimmed" size="sm" className={classes.control} onClick={() => {void navigate('/login')}}>
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