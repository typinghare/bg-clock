import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './App.css';
import { ClockPanel } from '../clockPanel/ClockPanel';
import { SelectPanel } from '../selectPanel/SelectPanel';
import { useAppSelector } from '../../redux/hooks';
import { Panel, selectPanel } from '../../redux/slice/PanelSlice';

export type PanelProps = { isShow: boolean }

export const App: FunctionComponent = () => {
  const panel: Panel = useAppSelector(selectPanel);

  return <Box className='App'>
    <ClockPanel isShow={panel === Panel.CLOCK_PANEL} />
    <SelectPanel isShow={panel === Panel.SELECT_PANEL} />
  </Box>;
};
