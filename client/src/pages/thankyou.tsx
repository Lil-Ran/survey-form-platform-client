import React from 'react';
import { Box, Text } from '@mantine/core';

const ThankYou: React.FC = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
      }}
    >
      <Text
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#276AB7',
        }}
      >
        感谢您的回答
      </Text>
    </Box>
  );
};

export default ThankYou;
