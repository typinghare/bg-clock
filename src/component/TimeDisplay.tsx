import React from 'react'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Box, BoxProps } from '@mui/material'

export type TimeDisplayProps = BoxProps & {
    // The time to display.
    time: HourMinuteSecond,

    // The color of the text.
    color: string
}

export const TimeDisplay: React.FC<TimeDisplayProps> = function(props): JSX.Element {
    const { time, color, sx, ...otherProps } = props
    const timeString = time.toString()
    const style: React.CSSProperties = { ...sx, color } as React.CSSProperties

    return <Box sx={style} {...otherProps}>{timeString}</Box>
}