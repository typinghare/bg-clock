import { Box, BoxProps } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { padStart } from 'lodash';
import { Time } from '../../../common/Time';

const MAX_HOUR_LENGTH: number = 2;
const MAX_MINUTE_LENGTH: number = 2;
const MAX_SECOND_LENGTH: number = 2;
const HOUR_PADDING_STRING: string = '0';
const MINUTE_PADDING_STRING: string = '0';
const SECOND_PADDING_STRING: string = '0';
const DEFAULT_FLASHING_INTERVAL: number = 1000;

export type TimeDisplayProps = BoxProps & {
    // the time to be shown
    time: Time;

    // the color of the time string
    color: string;

    // whether the colon flashes
    isFlashing?: boolean;

    // the interval of flashing in ms, default value: 1000
    flashingInterval?: number;
}

/**
 * @component Time Display.
 */
export const TimeDisplay: FunctionComponent<TimeDisplayProps> = (props: TimeDisplayProps) => {
    const { time, color, isFlashing, flashingInterval } = props;

    const [showColon, setShowColon] = React.useState(true);
    const hour = padStart(time.hour.toString(), MAX_HOUR_LENGTH, HOUR_PADDING_STRING);
    const minute = padStart(time.minute.toString(), MAX_MINUTE_LENGTH, MINUTE_PADDING_STRING);
    const second = padStart(time.second.toString(), MAX_SECOND_LENGTH, SECOND_PADDING_STRING);

    React.useEffect(() => {
        const flashInterval = isFlashing ? setInterval(() => {
            setShowColon(!showColon);
        }, flashingInterval || DEFAULT_FLASHING_INTERVAL) : null;

        return () => {
            flashInterval && clearInterval(flashInterval);
        };
    }, [isFlashing, flashingInterval, showColon]);

    return <Box display='inline-block' className={props.className} sx={{ color }}>
        {
            hour + (isFlashing && !showColon ? ' ' : ':') +
            minute + (isFlashing && !showColon ? ' ' : ':') +
            second
        }
    </Box>;
};
