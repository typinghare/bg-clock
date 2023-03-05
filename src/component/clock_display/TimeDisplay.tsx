import { Box, BoxProps } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { padStart } from 'lodash';
import { Time } from '../../logic/Time';

const MAX_HOUR_LENGTH: number = 2;
const MAX_MINUTE_LENGTH: number = 2;
const MAX_SECOND_LENGTH: number = 2;
const HOUR_PADDING_STRING: string = '0';
const MINUTE_PADDING_STRING: string = '0';
const SECOND_PADDING_STRING: string = '0';
const DEFAULT_FLASHING_INTERVAL: number = 1000;

export interface TimeDisplayProps extends BoxProps {
  // the time to be shown
  timeSymbol: Time.Symbol;

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
  const [showColon, setShowColon] = React.useState(true);
  const hour = padStart(props.timeSymbol.hour.toString(), MAX_HOUR_LENGTH, HOUR_PADDING_STRING);
  const minute = padStart(props.timeSymbol.minute.toString(), MAX_MINUTE_LENGTH, MINUTE_PADDING_STRING);
  const second = padStart(props.timeSymbol.second.toString(), MAX_SECOND_LENGTH, SECOND_PADDING_STRING);

  React.useEffect(() => {
    const flashInterval = props.isFlashing ? setInterval(() => {
      setShowColon(!showColon);
    }, props.flashingInterval || DEFAULT_FLASHING_INTERVAL) : null;

    return () => {
      flashInterval && clearInterval(flashInterval);
    };
  }, [props.isFlashing, props.flashingInterval, showColon]);

  return <Box display='inline-block' className={props.className} sx={{ color: props.color }}>
    {
      hour + (props.isFlashing && !showColon ? ' ' : ':') +
      minute + (props.isFlashing && !showColon ? ' ' : ':') +
      second
    }
  </Box>;
};
