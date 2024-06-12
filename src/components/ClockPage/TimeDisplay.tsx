import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Box, BoxProps } from '@chakra-ui/react'

/**
 * Time display.
 */
export function TimeDisplay(props: TimeDisplayProps) {
    const { time, ...boxProps } = props

    return (
        <Box {...boxProps}>
            {time.toString()}
        </Box>
    )
}

export interface TimeDisplayProps extends BoxProps {
    // Time to display
    time: HourMinuteSecond
}
