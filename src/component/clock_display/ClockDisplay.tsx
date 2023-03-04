import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './ClockDisplay.css';
import { TimeDisplay } from './TimeDisplay';
import { Agent } from '../../logic/Agent';
import { AgentManager, AgentPosition } from '../../logic/AgentManager';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentAgent, selectIsClockRunning } from '../../redux/slice/AgentSlice';
import { Time } from '../../logic/Time';

export interface ClockDisplayProps {
  // agent position
  agentPosition: AgentPosition;

  // rotate angle
  rotateAngle?: number;
}

const clockDisplayInnerStyle = (props: ClockDisplayProps): React.CSSProperties => {
  return {
    transform: props.rotateAngle ? `rotate(${props.rotateAngle}deg)` : undefined,
  };
};

export const ClockDisplay: FunctionComponent<ClockDisplayProps> = (props: ClockDisplayProps) => {
  const isClockRunning: boolean = useAppSelector(selectIsClockRunning);
  const agent: Agent | undefined = AgentManager.getInstance().getAgent(props.agentPosition);
  const currentAgent: AgentPosition = useAppSelector(selectCurrentAgent);

  const [timeSymbol, setTimeSymbol] = React.useState(agent?.timer.time || Time.create(0, 0, 0));

  React.useEffect(() => {
    setInterval(() => {
      const agent: Agent | undefined = AgentManager.getInstance().getAgent(props.agentPosition);
      if (agent !== undefined) {
        const realtimeSymbol = agent.timer.time;
        setTimeSymbol(Time.copy(realtimeSymbol));
      }
    }, 200);
  }, [props.agentPosition]);

  if (agent === undefined) {
    // the agent has not been set
    return <Box></Box>;
  }

  const timerOn: boolean = isClockRunning && currentAgent === props.agentPosition;
  const color: string = timerOn ? '#333' : '#999';

  return <Box className='ClockDisplayContainer'>
    <Box className='ClockDisplayInner' style={clockDisplayInnerStyle(props)}>
      <TimeDisplay timeSymbol={timeSymbol} color={color} />
    </Box>
  </Box>;
};