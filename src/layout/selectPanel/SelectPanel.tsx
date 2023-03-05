import { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './SelectPanel.css';
import { PanelProps } from '../app/App';

export type SelectPanelProps = PanelProps & {};

export const SelectPanel: FunctionComponent<SelectPanelProps> = (props: SelectPanelProps) => {
  return <Box className='SelectPanel' sx={{ display: props.isShow ? 'block' : 'none' }}>
  </Box>;
};