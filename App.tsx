import React, { useState } from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import InputSection from './components/InputSection';
import OptionsSection from './components/OptionsSection';
import ActionSection from './components/ActionSection';
import OutputSection from './components/OutputSection';

// Define a professional theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export interface Quiz {
  id: string;
  type: 'mcq' | 'fill_in_the_blank';
  question_text: string;
  options?: { [key: string]: string };
  correct_answer: string;
}

export interface QuizVersion {
  version: number;
  questions: Quiz[];
}

const App: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [questionTypes, setQuestionTypes] = useState<'mcq_only' | 'fill_only' | 'mixed'>('mcq_only');
  const [numVersions, setNumVersions] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [generatedQuizzes, setGeneratedQuizzes] = useState<QuizVersion[]>([]);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedQuizzes([]);

    let content = '';
    let source_type: 'text' | 'file' = 'text';
    let file_name = '';

    if (uploadedFile) {
      source_type = 'file';
      file_name = uploadedFile.name;
      try {
        content = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(uploadedFile);
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = (error) => reject(error);
        });
      } catch (err) {
        setError('Failed to read the uploaded file.');
        setIsLoading(false);
        return;
      }
    } else {
      source_type = 'text';
      content = sourceText;
    }

    const requestBody = {
      source_type,
      content,
      file_name,
      num_questions: numQuestions,
      question_types: questionTypes,
      num_versions: numVersions,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      }

      const data = await response.json();
      setGeneratedQuizzes(data.quizzes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Intelligent Study AI Quiz Generator
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Automatically create quizzes from your study materials.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <InputSection
            sourceText={sourceText}
            setSourceText={setSourceText}
            setUploadedFile={setUploadedFile}
            uploadedFile={uploadedFile}
            disabled={isLoading}
          />
          <OptionsSection
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            questionTypes={questionTypes}
            setQuestionTypes={setQuestionTypes}
            numVersions={numVersions}
            setNumVersions={setNumVersions}
            disabled={isLoading}
          />
          <ActionSection
            onGenerate={handleGenerateQuiz}
            disabled={(!sourceText && !uploadedFile) || isLoading}
          />

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {generatedQuizzes.length > 0 && !isLoading && (
            <OutputSection quizzes={generatedQuizzes} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;


