import { Game } from '@typinghare/board-game-clock-core'
import { useEffect, useState } from 'react'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Color, GameParameters } from '../common/constant'
import { Box, BoxProps, SxProps } from '@mui/material'
import { TimeDisplay } from './TimeDisplay'
import { MuiStyles } from '../common/interfaces'

export interface ClockDisplayProps extends BoxProps {
    game: Game

    // The label of role of this clock display.
    role: 'A' | 'B'
}

export function ClockDisplay(props: ClockDisplayProps): JSX.Element {
    const { game, role, sx, ...otherProps } = props
    const [time, setTime] = useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState(Color.TIME_PAUSED_COLOR)

    function handleClockDisplayClick(): void {
        game.getPlayer(role).click()
    }

    const styles: MuiStyles<'root' | 'timeDisplay'> = {
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ...sx,
        },
        timeDisplay: {
            fontSize: '12vh',
            fontFamily: 'Digital-7',
            color: color,
            userSelect: 'none',
            cursor: 'default',
        },
    }

    useEffect(() => {
        const intervalHandle = setInterval((): void => {
            const player = game.getPlayer(role)
            const time = player.clockController.clockTime
            setTime(time)

            // Change Color.
            if (time.ms === 0) {
                setColor(Color.TIME_UP_COLOR)
            } else {
                if (player.clockController.isClockRunning()) {
                    setColor(Color.TIME_RUNNING_COLOR)
                } else {
                    setColor(Color.TIME_PAUSED_COLOR)
                }
            }
        }, SlowHourMinuteSecond.MILLISECONDS_IN_SECOND / GameParameters.REFRESH_RATE)

        return (): void => {
            // Clear time interval.
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [game, role])

    return <Box
        sx={styles.root as SxProps<any>}
        onClick={handleClockDisplayClick}
        {...otherProps}
    >
        <TimeDisplay
            time={time}
            sx={styles.timeDisplay}
        />
    </Box>
}