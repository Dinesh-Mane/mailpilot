import { useState } from 'react';
import { Box, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent, tone
      })
      setGeneratedReply(typeof response.data == 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply');
      console.error(error);
    } finally {
      setLoading(false)
    }
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
          rows={16}
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

      {error && (
        <Typography
          color='error'
          sx={{ mb:2 }}
        >
          {error}
        </Typography>

      )}

      {generatedReply && (
        <Box sx={{ mt:3 }}>
          <Typography
            variant='h6'
            gutterBottom>
              Generated Reply:
          </Typography>
          <TextField
          fullWidth
          multiline
          rows={15}
          variant='outlined'
          value={generatedReply || ''}
          inputProps={{readOnly: true}}
          sx={{ mb:2 }}/>
          <Button
            variant='contained'
            onClick={() => navigator.clipboard.writeText(generatedReply)}
            fullWidth
            sx={{ mb:2 }}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;