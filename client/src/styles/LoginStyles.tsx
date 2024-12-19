import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#2c3e50',
};

export const boxStyle: CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  padding: '2rem',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  textAlign: 'center',
};

export const titleStyle: CSSProperties = {
  marginBottom: '1rem',
  fontFamily: 'Roboto, sans-serif',
};

export const subtitleStyle: CSSProperties = {
  fontWeight: 'bold',
  color: '#6c5ce7',
};

export const hintStyle: CSSProperties = {
  color: 'dimmed',
  textAlign: 'center',
};

export const inputGroupStyle: CSSProperties = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1rem',
};

export const inputStyle: CSSProperties = {
  margin: '0 auto',
  width: '90%',
};

export const buttonGroupStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
};

export const buttonStyle: CSSProperties = {
  backgroundColor: 'orange',
  width: '160px',
};