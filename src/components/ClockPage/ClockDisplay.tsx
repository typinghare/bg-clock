import { Box, BoxProps } from '@chakra-ui/react'
import { EndedState, NotStartedState, OngoingState, Player, PlayerTapEvent } from '../../game'
import { useEffect, useState } from 'react'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Color } from './constants'
import { StyleMap } from '../../common/style'
import { TimeDisplay } from './TimeDisplay'
import { useBoardGame } from '../../state/useBoardGame'
import { ClockBubbleContainer } from './ClockBubbleContainer'
import soundBeep from '../../assets/sounds/beep.wav'
import soundCountdown1 from '../../assets/sounds/countdown/1.mp3'
import soundCountdown2 from '../../assets/sounds/countdown/2.mp3'
import soundCountdown3 from '../../assets/sounds/countdown/3.mp3'
import soundCountdown4 from '../../assets/sounds/countdown/4.mp3'
import soundCountdown5 from '../../assets/sounds/countdown/5.mp3'
import soundCountdown6 from '../../assets/sounds/countdown/6.mp3'
import soundCountdown7 from '../../assets/sounds/countdown/7.mp3'
import soundCountdown8 from '../../assets/sounds/countdown/8.mp3'
import soundCountdown9 from '../../assets/sounds/countdown/9.mp3'
import { Audio } from '../Audio'

const soundCountdownList = [
    soundCountdown1,
    soundCountdown2,
    soundCountdown3,
    soundCountdown4,
    soundCountdown5,
    soundCountdown6,
    soundCountdown7,
    soundCountdown8,
    soundCountdown9,
]

/**
 * Clock display.
 */
export function ClockDisplay(props: ClockDisplayProps) {
    const { player, sx, ...boxProps } = props
    const [boardGame] = useBoardGame()
    const [time, setTime] = useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState<string>(Color.TIME_PAUSED_COLOR)
    const [beepSignal, setBeepSignal] = useState(-1)
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
            if (!boardGame) {
                return
            }

            const time = player.getTime()
            setTime(time)

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

        if (boardGame.isState(NotStartedState) || boardGame.isState(OngoingState)) {
            setBeepSignal((beepSignal + 1) % 2)
        }

        if (boardGame.isState(NotStartedState)) {
            // Start the board game
            boardGame.start()
        }

        boardGame.getGameContext().eventManager.trigger(new PlayerTapEvent({
            role: player.getRole(),
        }))
    }

    return (
        <Box
            sx={styles.root}
            onClick={handleClick}
            {...boxProps}
        >
            <Audio signal={beepSignal} src={soundBeep} />
            <ClockCountdownAudio player={player} />
            <ClockBubbleContainer
                sx={styles.bubbleGroup}
                playerExtraData={player.getExtraData()}
            />

            <TimeDisplay
                time={time}
                sx={styles.timeDisplay}
            />
        </Box>
    )
}

/**
 * Clock countdown audios.
 */
export function ClockCountdownAudio(props: ClockCountdownAudioProps) {
    const { player } = props
    const [second, setSecond] = useState<number>(player.getTime().second)
    const [signalList, setSignalList] = useState<number[]>(Array(9).fill(-1))

    useEffect(() => {
        const intervalHandle = setInterval(() => {
            const time: HourMinuteSecond = player.getTime()
            const currentSecond = time.second

            if (second !== currentSecond) {
                setSecond(currentSecond)

                if (currentSecond >= 1 && currentSecond <= 9) {
                    const index = currentSecond - 1
                    setSignalList((prevSignalList) => {
                        const newSignalList = [...prevSignalList]
                        newSignalList[index] = (1 + newSignalList[index]) % 2

                        return newSignalList
                    })
                }
            }
        }, 10)

        return (): void => {
            // Clear time interval.
            if (intervalHandle) clearInterval(intervalHandle)
        }
    }, [second, player])

    return (
        <>
            {signalList.map((_, index) => (
                <Audio key={index} signal={signalList[index]} src={soundCountdownList[index]} />
            ))}
        </>
    )
}

/**
 * Clock display properties.
 */
export interface ClockDisplayProps extends BoxProps {
    player: Player
}

/**
 * Clock countdown audio properties.
 */
export interface ClockCountdownAudioProps {
    player: Player
}