import React, { useState, useCallback } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface InputSectionProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  disabled: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  sourceText,
  setSourceText,
  uploadedFile,
  setUploadedFile,
  disabled,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [fileError, setFileError] = useState('');
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    // Clear other input type on tab change
    if (newValue === 0) {
      setUploadedFile(null);
    } else {
      setSourceText('');
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      setFileError('');
      if (fileRejections.length > 0) {
        setFileError('Invalid file type. Please upload a .pdf, .docx, .pptx, or .txt file.');
        setUploadedFile(null);
        return;
      }
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
      }
    },
    [setUploadedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled,
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text.length <= 100000) {
      setSourceText(text);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="input type tabs"
        disabled={disabled}
      >
        <Tab label="Paste Text" />
        <Tab label="Upload File" />
      </Tabs>
      <Box p={3}>
        {tabIndex === 0 && (
          <Box>
            <TextField
              label="Paste your text here"
              multiline
              rows={8}
              variant="outlined"
              fullWidth
              value={sourceText}
              onChange={handleTextChange}
              disabled={disabled}
              inputProps={{ maxLength: 100000 }}
            />
            <Typography
              variant="caption"
              align="right"
              component="p"
              sx={{ mt: 1, color: sourceText.length > 95000 ? 'error.main' : 'text.secondary' }}
            >
              {sourceText.length.toLocaleString()} / 100,000 characters
            </Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box
            {...getRootProps()}
            sx={{
              border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
              borderRadius: 1,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? `${theme.palette.primary.main}11` : 'transparent',
              transition: 'background-color 0.2s',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <Box>
                <Typography>File: {uploadedFile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Size: {(uploadedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            ) : (
              <Typography color="textSecondary">
                {isDragActive
                  ? 'Drop the files here...'
                  : 'Drag & drop files here, or click to select files'}
              </Typography>
            )}
            {fileError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {fileError}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default InputSection;


