import React, { useState } from 'react';
import { Paper, Tabs, Tab, Box, Typography } from '@mui/material';
import QuizDisplay from './QuizDisplay';
import { QuizVersion } from '../App';

interface OutputSectionProps {
  quizzes: QuizVersion[];
}

const OutputSection: React.FC<OutputSectionProps> = ({ quizzes }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  
  if (!quizzes || quizzes.length === 0) {
      return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 0, overflow: 'hidden', mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Generated Quizzes</Typography>
      {quizzes.length > 1 ? (
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="quiz version tabs"
        >
          {quizzes.map((quiz, index) => (
            <Tab label={`Quiz Version ${index + 1}`} key={index} />
          ))}
        </Tabs>
      ) : null}
      
      {quizzes.map((quiz, index) => (
        <div
            role="tabpanel"
            hidden={tabIndex !== index}
            id={`quiz-tabpanel-${index}`}
            aria-labelledby={`quiz-tab-${index}`}
            key={index}
        >
            {tabIndex === index && (
                <Box sx={{ p: 3 }}>
                    <QuizDisplay quizData={quiz.questions} />
                </Box>
            )}
        </div>
      ))}

    </Paper>
  );
};

export default OutputSection;


