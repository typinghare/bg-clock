import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { TimeDisplay } from './TimeDisplay'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TIME_PAUSED_COLOR, TIME_RUNNING_COLOR, TIME_UP_COLOR } from '../common/constant'
import { GameManager } from '../game/GameManager'
import { Player, Role } from '@typinghare/board-game-clock-core'

export type ClockDisplayProps = BoxProps & {
    // The label of role of this clock display.
    role: 'A' | 'B'

    // Whether the clock is overturn.
    overturn?: boolean
}

export const ClockDisplay: React.FC<ClockDisplayProps> = function(props): JSX.Element {
    const { role, overturn, sx, ...otherProps } = props
    const [time, setTime] = React.useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = React.useState(TIME_PAUSED_COLOR)

    function handleClockDisplayClick(): void {
        const game = GameManager.INSTANCE.game
        game.getPlayer(new Role(role)).onClick()
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
            if (!GameManager.INSTANCE.isGameStarted()) return

            const game = GameManager.INSTANCE.game
            const player: Player = game.getPlayer(new Role(role))
            const time = player.clockController.clockTime
            setTime(time)

            if (time.ms === 0) {
                setColor(TIME_UP_COLOR)
            } else {
                if (player.clockController.isClockRunning()) {
                    setColor(TIME_RUNNING_COLOR)
                } else {
                    setColor(TIME_PAUSED_COLOR)
                }
            }
        }, 500)

        return (): void => {
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [role])

    return <Box sx={style} {...otherProps} onClick={handleClockDisplayClick}>
        <TimeDisplay time={time} color={color} sx={timeDisplayStyle} />
    </Box>
}