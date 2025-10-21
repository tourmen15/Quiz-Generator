import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Grid,
} from '@mui/material';

interface OptionsSectionProps {
  numQuestions: number;
  setNumQuestions: (value: number) => void;
  questionTypes: string;
  setQuestionTypes: (value: 'mcq_only' | 'fill_only' | 'mixed') => void;
  numVersions: number;
  setNumVersions: (value: number) => void;
  disabled: boolean;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  numQuestions,
  setNumQuestions,
  questionTypes,
  setQuestionTypes,
  numVersions,
  setNumVersions,
  disabled,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customization Options
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Box>
            <FormLabel component="legend">Number of Questions: {numQuestions}</FormLabel>
            <Slider
              value={numQuestions}
              onChange={(e, newValue) => setNumQuestions(newValue as number)}
              aria-labelledby="input-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={40}
              disabled={disabled}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset" disabled={disabled}>
            <FormLabel component="legend">Question Types</FormLabel>
            <RadioGroup
              row
              aria-label="question types"
              name="question-types-group"
              value={questionTypes}
              onChange={(e) => setQuestionTypes(e.target.value as 'mcq_only' | 'fill_only' | 'mixed')}
            >
              <FormControlLabel value="mcq_only" control={<Radio />} label="MCQs Only" />
              <FormControlLabel value="fill_only" control={<Radio />} label="Fill-in-the-Blanks" />
              <FormControlLabel value="mixed" control={<Radio />} label="Mixed" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl fullWidth disabled={disabled}>
                <InputLabel id="num-versions-select-label">Quiz Versions</InputLabel>
                <Select
                labelId="num-versions-select-label"
                id="num-versions-select"
                value={numVersions}
                label="Quiz Versions"
                onChange={(e) => setNumVersions(e.target.value as number)}
                >
                {[...Array(7)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OptionsSection;


