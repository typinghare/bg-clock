import React, { FunctionComponent } from 'react';
import { AgentManager, AgentPosition } from '../../logic/AgentManager';
import { Box } from '@mui/material';
import { ClockDisplay } from '../../component/clock_display/ClockDisplay';
import './Clock.css';
import { useAppDispatch } from '../../redux/hooks';
import { clockRun, switchAgent } from '../../redux/slice/AgentSlice';

export type ClockProps = {}

export const Clock: FunctionComponent = (props: ClockProps) => {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(clockRun(AgentPosition.A));
  }, [dispatch]);

  const onClickSectionProvider = (agentPosition: AgentPosition) => {
    return () => {
      const agentManager = AgentManager.getInstance();
      if (agentManager.runningAgent === agentPosition) {
        dispatch(switchAgent());
      }
    };
  };

  return <Box className='Clock'>
    <Box className='SectionB' onClick={onClickSectionProvider(AgentPosition.B)}>
      <ClockDisplay agentPosition={AgentPosition.B} rotateAngle={180} />
    </Box>
    <Box className='ClockRibbon'></Box>
    <Box className='SectionA' onClick={onClickSectionProvider(AgentPosition.A)}>
      <ClockDisplay agentPosition={AgentPosition.A} />
    </Box>
  </Box>;
};
