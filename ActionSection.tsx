import React from 'react';
import { Box, Button } from '@mui/material';

interface ActionSectionProps {
  onGenerate: () => void;
  disabled: boolean;
}

const ActionSection: React.FC<ActionSectionProps> = ({ onGenerate, disabled }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onGenerate}
        disabled={disabled}
        sx={{ minWidth: '200px', minHeight: '50px' }}
      >
        Generate Quiz
      </Button>
    </Box>
  );
};

export default ActionSection;


