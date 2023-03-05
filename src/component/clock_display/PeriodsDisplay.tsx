import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './ClockDisplay.css';

export type PeriodsDisplayProps = {
  // the periods left
  periods: number

  // whether overturn
  overturn?: boolean
}

const periodsDisplayStyle = (props: PeriodsDisplayProps): React.CSSProperties => {
  const toOverturn: boolean = props.overturn === true;
  const style: React.CSSProperties = toOverturn ?
    { bottom: 0, right: 0 } :
    { top: 0, left: 0 };

  if (toOverturn) {
    style['transform'] = 'rotate(180deg)';
  }

  return style;
};

export const PeriodsDisplay: FunctionComponent<PeriodsDisplayProps> = (props: PeriodsDisplayProps) => {
  return <Box className='PeriodsDisplay' style={periodsDisplayStyle(props)}>
    <Box className='PeriodsDisplayInner'>{props.periods}</Box>
  </Box>;
};