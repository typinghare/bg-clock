import React, { FunctionComponent } from 'react';
import { Role } from '../../../logic/Role';
import { Box } from '@mui/material';
import './ClockDisplay.css';
import { TimeDisplay } from './TimeDisplay';
import { Game } from '../../../logic/Game';
import { GameController } from '../../../logic/GameController';
import { TimeControl } from '../../../logic/TimeControl';
import { Time } from '../../../common/Time';
import { PeriodDisplay } from './PeriodDisplay';

const CLOCK_END_COLOR: string = '#ef233c';
const CLOCK_PAUSED_COLOR: string = '#999';
const CLOCK_RUNNING_COLOR: string = '#333';

export type ClockDisplayProps = {
    // the role of the player
    playerRole: Role,

    // whether to overturn
    overturn?: boolean
}

const clockDisplayInnerStyle = (overturn?: boolean): React.CSSProperties => {
    return {
        transform: overturn === true ? 'rotate(180deg)' : undefined,
    };
};

/**
 * @component
 */
export const ClockDisplay: FunctionComponent<ClockDisplayProps> = ({ playerRole, overturn }) => {
    const [time, setTime] = React.useState(Time.zero());
    const [periods, setPeriods] = React.useState(5);
    const [color, setColor] = React.useState('#999');

    React.useEffect(() => {
        const intervalId: NodeJS.Timer = setInterval(() => {
            if (!GameController.INSTANCE.isGameStarted())
                return;

            const game: Game = GameController.INSTANCE.getGame();
            const timeControl: TimeControl = game.getPlayer(playerRole).timeControl;
            const isRunning: boolean = timeControl.isTimerRunning();
            const isEnd: boolean = timeControl.isEnd();

            setTime(timeControl.getTime());
            setPeriods(timeControl.getPeriodsLeft());
            setColor(isEnd ? CLOCK_END_COLOR : (isRunning ? CLOCK_RUNNING_COLOR : CLOCK_PAUSED_COLOR));
        }, Time.SECOND / 4);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    });

    return <Box className='ClockDisplay'>
        <PeriodDisplay periods={periods} overturn={overturn} />
        <Box className='ClockDisplayInner' style={clockDisplayInnerStyle(overturn)}>
            <TimeDisplay color={color} time={time}></TimeDisplay>
        </Box>
    </Box>;
};