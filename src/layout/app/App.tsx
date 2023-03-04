import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './App.css';
import { Clock } from '../clock/Clock';

export const App: FunctionComponent = () => {
  return <Box className="App">
    <Clock />
  </Box>;
};
