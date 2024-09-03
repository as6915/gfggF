import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // رابط الواجهة الخلفية

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [correction, setCorrection] = useState('');

  const handleSubmit = () => {
    socket.emit('generate-code', { input });
  };

  socket.on('code-response', (data) => {
    setCode(data.code);
    setExplanation(data.explanation);
    setCorrection(data.correction);
  });

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        مساعد البرمجة الذكي
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="اكتب طلبك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          أرسل
        </Button>
      </Paper>
      <Box>
        <Typography variant="h6">الكود:</Typography>
        <Paper style={{ padding: '10px' }}>{code}</Paper>
      </Box>
      <Box>
        <Typography variant="h6">الشرح:</Typography>
        <Paper style={{ padding: '10px' }}>{explanation}</Paper>
      </Box>
      <Box>
        <Typography variant="h6">التصحيح:</Typography>
        <Paper style={{ padding: '10px' }}>{correction}</Paper>
      </Box>
    </Container>
  );
};

export default App;
