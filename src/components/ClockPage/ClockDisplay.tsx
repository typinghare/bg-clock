import { Box, BoxProps } from '@chakra-ui/react'
import { BoardGame, EndedState, NotStartedState, OngoingState, Player, PlayerTapEvent, Role } from '../../game'
import { useEffect, useState } from 'react'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Color } from './constants'
import { StyleMap } from '../../common/style'
import { TimeDisplay } from './TimeDisplay'
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
import { selectBoardGameChangedSignal, selectTimeControlChangedSignal, useAppSelector } from '../../redux'
import { boardGameHolder } from '../../common/holder'
import { settings } from '../../common/settings'

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
    const { role, sx, ...boxProps } = props
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const [player, setPlayer] = useState<Player | undefined>(undefined)
    const [time, setTime] = useState<HourMinuteSecond>(SlowHourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState<string>(Color.TIME_PAUSED_COLOR)
    const [beepSignal, setBeepSignal] = useState(-1)
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
            fontSize: settings.getValue('clockTimeFontSize') + 'vw',
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

            const player = boardGame.getPlayer(role)
            if (!player) {
                return
            }

            const currentTime = player.getTime()
            setTime(currentTime)

            // Change font color
            const boardGameState = boardGame.getState()
            if (boardGameState instanceof EndedState && currentTime.ms === 0) {
                setColor(Color.TIME_UP_COLOR)
            } else {
                if (player.isPaused()) {
                    setColor(Color.TIME_PAUSED_COLOR)
                } else {
                    setColor(Color.TIME_RUNNING_COLOR)
                }
            }
        }, SlowHourMinuteSecond.MILLISECONDS_IN_SECOND / 60)

        return () => {
            if (intervalHandle) {
                clearInterval(intervalHandle)
            }
        }
    }, [boardGame])

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
        if (currentBoardGame) {
            setPlayer(currentBoardGame.getPlayer(role))
        }
    }, [boardGameChangedSignal, timeControlChangedSignal])

    if (!player) {
        return (<Box />)
    }

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
            role,
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
 * @summary This is fucking hard.
 */
export function ClockCountdownAudio(props: ClockCountdownAudioProps) {
    const { player } = props
    const [signalList, setSignalList] = useState<number[]>(Array(9).fill(-1))

    useEffect(() => {
        let second: number = player.getTime().second
        const intervalHandle = setInterval(() => {
            const currentSecond = Math.floor(player.getTime().ms / HourMinuteSecond.MILLISECONDS_IN_SECOND)
            if (second !== currentSecond) {
                second = currentSecond
            } else {
                return
            }

            if (second > 9 || second <= 0) {
                return
            }

            const index = currentSecond - 1
            setSignalList((prevSignalList) => {
                const newSignalList = [...prevSignalList]
                newSignalList[index] = (1 + newSignalList[index]) % 2

                return newSignalList
            })
        }, 60)

        return () => {
            if (intervalHandle) {
                clearInterval(intervalHandle)
            }
        }
    }, [player])

    return (
        <>
            {signalList.map((_, index) => (
                <Audio
                    key={index}
                    signal={signalList[index]}
                    src={soundCountdownList[index]}
                />
            ))}
        </>
    )
}

/**
 * Clock display properties.
 */
export interface ClockDisplayProps extends BoxProps {
    role: Role
}

/**
 * Clock countdown audio properties.
 */
export interface ClockCountdownAudioProps {
    player: Player
}