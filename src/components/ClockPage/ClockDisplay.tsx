import {
    BoardGame,
    BoardGameSave,
    EndedState,
    NotStartedState,
    Player,
    PlayerTapEvent,
    Role,
} from '../../game'
import { Box, BoxProps } from '@chakra-ui/react'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import { useEffect, useState } from 'react'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { FontFamily, LocalStorageKey, TimeColor } from '../../common/constants'
import { settings } from '../../common/settings'
import { boardGameHolder } from '../../common/holder'
import { TimeDisplay } from './TimeDisplay'
import { CountdownEvent } from '../../game/event/CountdownEvent'
import { ClockBubbleContainer } from './ClockBubbleContainer'

export function ClockDisplay(props: ClockDisplayProps) {
    const { role, ...boxProps } = props
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const [player, setPlayer] = useState<Player | undefined>(undefined)
    const [time, setTime] = useState<HourMinuteSecond>(HourMinuteSecond.ofSeconds(0))
    const [color, setColor] = useState<string>(TimeColor.TIME_PAUSED_COLOR)
    const clockTimeFontSize = settings.getValue('clockTimeFontSize') * 0.75

    useEffect(() => {
        const intervalHandle = setInterval((): void => {
            if (!boardGame || boardGame.isState(NotStartedState)) {
                return
            }

            const player = boardGame.getPlayer(role)
            if (!player) {
                return
            }

            // Change time font color
            const boardGameState = boardGame.getState()
            const currentTime = player.getTime()
            if (boardGameState instanceof EndedState && currentTime.ms === 0) {
                setColor(TimeColor.TIME_UP_COLOR)
            } else {
                if (player.isPaused()) {
                    setColor(TimeColor.TIME_PAUSED_COLOR)
                } else {
                    setColor(TimeColor.TIME_RUNNING_COLOR)
                }
            }

            if (player.isPaused()) {
                setTime(player.getTime())
                return
            }

            setTime((time): HourMinuteSecond => {
                const previousSeconds = time.toSecondsInt()
                const currentSeconds = currentTime.toSecondsInt()
                if (previousSeconds != currentSeconds) {
                    const countDownEvent = new CountdownEvent({ seconds: currentSeconds })
                    boardGame.getGameContext().eventManager.trigger(countDownEvent)

                    // Save board game to the local storage
                    localStorage.setItem(
                        LocalStorageKey.GAME_SAVE,
                        BoardGameSave.fromBoardGame(boardGame).toJson(),
                    )
                }

                return currentTime
            })
        }, HourMinuteSecond.MILLISECONDS_IN_SECOND / 60)

        return () => {
            clearInterval(intervalHandle)
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

        if (boardGame.isState(NotStartedState)) {
            // Start the board game
            boardGame.start()
        }

        const playerTapEvent = new PlayerTapEvent({ role })
        boardGame.getGameContext().eventManager.trigger(playerTapEvent)
    }

    return (
        <Box
            display="flex"
            position="relative"
            alignItems="center"
            justifyContent="center"
            height="100%"
            onClick={handleClick}
            {...boxProps}
        >
            <ClockBubbleContainer
                position="absolute"
                left="1.5rem"
                top="1.5rem"
                playerExtraData={player.getExtraData()}
            />

            <TimeDisplay
                time={time}
                color={color}
                fontSize={clockTimeFontSize + 'vh'}
                fontFamily={FontFamily.DIGITAL_7}
                userSelect="none"
                cursor="default"
            />
        </Box>
    )
}

/**
 * Clock display properties.
 */
export interface ClockDisplayProps extends BoxProps {
    role: Role
}
