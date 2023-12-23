import { Box, BoxProps } from '@chakra-ui/react'
import { EndedState, Player, PlayerTapEvent } from '../../game'
import { useEffect, useState } from 'react'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Color } from './constants'
import { StyleMap } from '../../common/style'
import { TimeDisplay } from './TimeDisplay'
import { useBoardGame } from '../../state/useBoardGame'
import { pulse, selectSignal, useAppDispatch, useAppSelector } from '../../redux'

export function ClockDisplay(props: ClockDisplayProps) {
    useAppSelector(selectSignal)
    const { player, sx, ...boxProps } = props
    const dispatch = useAppDispatch()
    const [boardGame] = useBoardGame()
    const [time, setTime] = useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState<string>(Color.TIME_PAUSED_COLOR)
    const clockTimeFontSize = 15
    const styles: StyleMap = {
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

    useEffect(() => {
        const intervalHandle = setInterval((): void => {
            const time = player.getTime()
            setTime(time)

            if (boardGame) {
                // Change font color
                const boardGameState = boardGame.getState()
                if (boardGameState instanceof EndedState && time.ms === 0) {
                    setColor(Color.TIME_UP_COLOR)
                } else {
                    if (player.isPaused()) {
                        setColor(Color.TIME_PAUSED_COLOR)
                    } else {
                        setColor(Color.TIME_RUNNING_COLOR)
                    }
                }
            }

            dispatch(pulse())
        }, SlowHourMinuteSecond.MILLISECONDS_IN_SECOND / 60)

        return (): void => {
            // Clear time interval.
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [])

    function handleClick(): void {
        if (!boardGame) {
            return
        }

        let game = boardGame.getGame()
        if (!game) {
            // Start the game
            game = boardGame.start()
        }

        game.getContext().eventManager.trigger(new PlayerTapEvent({ role: player.getRole() }))
    }

    return (
        <Box
            sx={styles.root}
            onClick={handleClick}
            {...boxProps}
        >
            <ClockBubbleGroup
                sx={styles.bubbleGroup}
                playerExtraData={0}
            />

            <TimeDisplay
                time={time}
                sx={styles.timeDisplay}
            />
        </Box>
    )
}

function ClockBubbleGroup(props: ClockBubbleGroup) {
    const { playerExtraData, ...boxProps } = props

    return (
        <Box {...boxProps}>
        </Box>
    )
}

export interface ClockDisplayProps extends BoxProps {
    player: Player
}

export interface ClockBubbleGroup extends BoxProps {
    playerExtraData: number
}