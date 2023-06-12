import { Box, BoxProps } from '@mui/material'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

export interface TimeDisplayProps extends BoxProps {
    // The time to display.
    time: HourMinuteSecond,
}

export function TimeDisplay(props: TimeDisplayProps): JSX.Element {
    const { time, ...otherProps } = props
    const timeString = time.toString()

    return (
        <Box {...otherProps}>
            {timeString}
        </Box>
    )
}