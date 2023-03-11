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
        if (!GameController.INSTANCE.isGameBooted())
            return;

        const game: Game = GameController.INSTANCE.getGame();
        const timeControl: TimeControl = game.getPlayer(playerRole).timeControl;

        const intervalId: NodeJS.Timer = setInterval(() => {
            setTime(timeControl.getTime());
            setPeriods(timeControl.getPeriodsLeft());
            setColor(timeControl.isTimerRunning() ? '#333' : '#999')
        }, 250);

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