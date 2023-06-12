import { ChessStandardPlayerAttributes, Game } from '@typinghare/board-game-clock-core'
import { useEffect, useState } from 'react'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Color, GameParameters } from '../common/constant'
import { Box, BoxProps, SxProps } from '@mui/material'
import { TimeDisplay } from './TimeDisplay'
import { MuiStyles } from '../common/interfaces'
import { useAppSettings } from '../hook/AppSettings'
import { SettingContainer } from '@typinghare/settings'
import { useToggle } from '../hook/Toggle'

export interface ClockDisplayProps extends BoxProps {
    game: Game

    // The label of role of this clock display.
    role: 'A' | 'B'
}

export function ClockDisplay(props: ClockDisplayProps): JSX.Element {
    const { game, role, sx, ...otherProps } = props
    const [time, setTime] = useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState(Color.TIME_PAUSED_COLOR)
    const [signal, toggleSignal] = useToggle()
    const [appSettingContainer] = useAppSettings()
    const clockTimeFontSize = appSettingContainer.getSetting('clockTimeFontSize').value
    const player = game.getPlayer(role)

    function handleClockDisplayClick(): void {
        game.getPlayer(role).click()
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

            // Toggle signal so that bubbles will update their values.
            toggleSignal()
        }, SlowHourMinuteSecond.MILLISECONDS_IN_SECOND / GameParameters.REFRESH_RATE)

        return (): void => {
            // Clear time interval.
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [game, role, toggleSignal])

    const styles: MuiStyles<'root' | 'timeDisplay' | 'bubbleGroup'> = {
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ...sx,
        },
        timeDisplay: {
            fontSize: clockTimeFontSize + 'vh',
            fontFamily: 'Digital-7',
            color: color,
            userSelect: 'none',
            cursor: 'default',
        },
        bubbleGroup: {
            position: 'absolute',
            left: '1.5rem',
            top: '1.5rem',
        },
    }

    return (
        <Box
            sx={styles.root as SxProps<any>}
            onClick={handleClockDisplayClick}
            {...otherProps}
        >
            <ClockBubbleGroup
                sx={styles.bubbleGroup}
                playerAttributes={player.attributes}
                signal={signal}
            />

            <TimeDisplay
                time={time}
                sx={styles.timeDisplay}
            />
        </Box>
    )
}

interface ClockBubbleGroupProps extends BoxProps {
    playerAttributes: SettingContainer<ChessStandardPlayerAttributes>
    signal: boolean
}

function ClockBubbleGroup(props: ClockBubbleGroupProps): JSX.Element {
    const { playerAttributes, signal, sx, ...otherProps } = props
    const attributes = playerAttributes.getSettings()

    let i = -1
    const clockBubbleList: JSX.Element[] = Object.values(attributes).map(attribute => {
        i += 1
        return (
            <ClockBubble
                key={i}
                index={i}
                content={attribute.value.toString()}
            />
        )
    })

    return (
        <Box sx={sx} {...otherProps} children={clockBubbleList} />
    )
}

interface ClockBubbleProps {
    index: number,
    content: string
}

function ClockBubble(props: ClockBubbleProps): JSX.Element {
    const { index, content } = props
    const colors = ['skyblue']
    const [appSettingContainer] = useAppSettings()
    const clockBubbleSize = appSettingContainer.getSetting('clockBubbleSize').value

    const styles: MuiStyles<'root' | 'inner'> = {
        root: {
            backgroundColor: colors[index % colors.length],
            height: (clockBubbleSize / 6) + 'rem',
            width: (clockBubbleSize / 6) * (1 + (content.length - 1) / 2) + 'rem',
            borderRadius: (clockBubbleSize / 12) + 'rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inner: {
            fontWeight: 'bold',
            fontSize: clockBubbleSize / 10 + 'rem',
        },
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.inner}>
                {content}
            </Box>
        </Box>
    )
}