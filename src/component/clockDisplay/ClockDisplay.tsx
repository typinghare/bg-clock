import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import './ClockDisplay.css';
import { TimeDisplay } from './TimeDisplay';
import { Agent } from '../../logic/Agent';
import { AgentManager, AgentPosition } from '../../logic/AgentManager';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentAgent, selectIsClockRunning } from '../../redux/slice/GameSlice';
import { Time } from '../../logic/Time';
import { PeriodsDisplay } from './PeriodsDisplay';

export interface ClockDisplayProps {
    // agent position
    agentPosition: AgentPosition;

    // whether to overturn
    overturn?: boolean;
}

const clockDisplayInnerStyle = (props: ClockDisplayProps): React.CSSProperties => {
    return {
        transform: props.overturn === true ? 'rotate(180deg)' : undefined,
    };
};

export const ClockDisplay: FunctionComponent<ClockDisplayProps> = (props: ClockDisplayProps) => {
    const isClockRunning: boolean = useAppSelector(selectIsClockRunning);
    const agent: Agent | undefined = AgentManager.getInstance().getAgent(props.agentPosition);
    const currentAgent: string = useAppSelector(selectCurrentAgent);

    const [timeSymbol, setTimeSymbol] = React.useState(agent?.timer.time || Time.create(0, 0, 0));
    const [periods, setPeriods] = React.useState(agent?.timer.periodNumberLeft || 0);

    React.useEffect(() => {
        setInterval(() => {
            const agent = AgentManager.getInstance().getAgent(props.agentPosition);
            if (agent !== undefined) {
                // time
                const realtimeSymbol = agent.timer.time;
                setTimeSymbol(Time.copy(realtimeSymbol));

                // change periods
                setPeriods(agent.timer.periodNumberLeft);
            }
        }, 250);
    }, [props.agentPosition]);

    if (agent === undefined) {
        // the agent has not been set
        return <Box></Box>;
    }

    const timeUp: boolean = AgentManager.getInstance().game?.timeUpAgent === props.agentPosition;
    const timerOn: boolean = isClockRunning && currentAgent === props.agentPosition.toString();
    const color: string = timeUp ? 'red' : (timerOn ? '#333' : '#999');

    return <Box className='ClockDisplayContainer'>
        <PeriodsDisplay periods={periods} overturn={props.overturn} />
        <Box className='ClockDisplayInner' style={clockDisplayInnerStyle(props)}>
            <TimeDisplay timeSymbol={timeSymbol} color={color} />
        </Box>
    </Box>;
};