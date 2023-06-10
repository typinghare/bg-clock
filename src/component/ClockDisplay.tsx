import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { TimeDisplay } from './TimeDisplay'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Game, Player } from '@typinghare/board-game-clock-core'
import { Color } from '../common/constant'

export type ClockDisplayProps = BoxProps & {
    game: Game

    // The label of role of this clock display.
    role: 'A' | 'B'

    // Whether the clock is overturn.
    overturn?: boolean
}

export const ClockDisplay: React.FC<ClockDisplayProps> = function(props): JSX.Element {
    const { game, role, overturn, sx, ...otherProps } = props
    const [time, setTime] = React.useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = React.useState(Color.TIME_PAUSED_COLOR)

    function handleClockDisplayClick(): void {
        game.getPlayer(role).click()
    }

    const style: React.CSSProperties = {
        ...sx,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        transform: overturn === true ? 'rotate(180deg)' : undefined,
    } as React.CSSProperties

    const timeDisplayStyle: React.CSSProperties = {
        fontSize: '20vw',
        color: '',
        userSelect: 'none',
        cursor: 'default',
    }

    React.useEffect(() => {
        const intervalHandle = setInterval((): void => {
            const player: Player = game.getPlayer(role)
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
        }, 500)

        return (): void => {
            // Clear time interval.
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [game, role])

    return <Box sx={style} {...otherProps} onClick={handleClockDisplayClick}>
        <TimeDisplay time={time} color={color} sx={timeDisplayStyle} />
    </Box>
}