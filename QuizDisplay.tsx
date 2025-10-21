import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import QuestionCard from './QuestionCard';
import { Quiz } from '../App';

interface QuizDisplayProps {
  quizData: Quiz[];
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ quizData }) => {
  const [editableQuizData, setEditableQuizData] = useState<Quiz[]>(quizData);

  const handleQuestionChange = (index: number, updatedQuestion: Quiz) => {
    const newQuizData = [...editableQuizData];
    newQuizData[index] = updatedQuestion;
    setEditableQuizData(newQuizData);
  };
  
  const handleExport = async (format: 'pdf' | 'docx' | 'txt') => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/export-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quiz_data: editableQuizData, format }),
        });

        if (!response.ok) {
            throw new Error('Failed to export the quiz.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

    } catch (error) {
        console.error('Export error:', error);
        // Here you might want to show an error to the user
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={() => handleExport('pdf')}>Download as PDF</Button>
        <Button variant="outlined" onClick={() => handleExport('docx')}>Download as DOCX</Button>
        <Button variant="outlined" onClick={() => handleExport('txt')}>Download as TXT</Button>
      </Stack>
      <Stack spacing={3}>
        {editableQuizData.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            onQuestionChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default QuizDisplay;


