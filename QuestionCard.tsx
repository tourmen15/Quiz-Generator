import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';
import { Quiz } from '../App';

interface QuestionCardProps {
  question: Quiz;
  questionNumber: number;
  onQuestionChange: (question: Quiz) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  onQuestionChange,
}) => {

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, question_text: e.target.value });
  };
  
  const handleOptionChange = (optionKey: string, value: string) => {
    onQuestionChange({ ...question, options: { ...question.options, [optionKey]: value }});
  };

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, correct_answer: e.target.value });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
        Question {questionNumber}:
      </Typography>
      <TextField
        fullWidth
        variant="filled"
        label="Question Text"
        value={question.question_text}
        onChange={handleQuestionTextChange}
        multiline
        sx={{ mb: 2 }}
      />

      {question.type === 'mcq' && question.options && (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup
            aria-label="correct answer"
            name="correct-answer-group"
            value={question.correct_answer}
            onChange={handleCorrectAnswerChange}
          >
            {Object.entries(question.options).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label=""
                  sx={{ mr: 0 }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  value={value}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {question.type === 'fill_in_the_blank' && (
         <TextField
            fullWidth
            variant="filled"
            label="Correct Answer"
            value={question.correct_answer}
            onChange={handleCorrectAnswerChange}
            sx={{ mt: 2 }}
        />
      )}
    </Paper>
  );
};

export default QuestionCard;


