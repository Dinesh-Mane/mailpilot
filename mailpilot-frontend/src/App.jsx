import { useState } from 'react';
import { Box, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {

  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>

      <Typography
        variant="h2"
        component="h1"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        MailPilot
      </Typography>

      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        sx={{
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        Your AI copilot for better emails
      </Typography>
      <br />
      <Box sx={{mx:3}}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb:2 }}/>

          <FormControl fullWidth>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}
              sx={{ mb:2 }}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
                <MenuItem value="Friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{ mb:2 }}>
            {loading? <CircularProgress size={2}/> : "Generate Reply"}
          </Button>

      </Box>
    </Container>
  );
}

export default App;