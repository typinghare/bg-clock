import { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './App.css';
import { ClockDisplay } from '../component/clock_display/ClockDisplay';

export const App: FunctionComponent = () =>
  <Box className='App'>
    <Box className='SectionA'>
      <ClockDisplay />
    </Box>
    <Box className='SplitArea'></Box>
    <Box className='SectionB'>
      <ClockDisplay />
    </Box>
  </Box>;