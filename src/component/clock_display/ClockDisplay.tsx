import { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './ClockDisplay.css'

export const ClockDisplay: FunctionComponent = () =>
  <Box className='ClockDisplayContainer'>
    <Box className='ClockDisplayInner'>
      12:09
    </Box>
  </Box>;