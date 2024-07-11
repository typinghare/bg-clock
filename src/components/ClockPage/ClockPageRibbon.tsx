import { Box, BoxProps } from '@chakra-ui/react'
import {
    BoardGame,
    EndedState,
    NotStartedState,
    OngoingState,
    PausedState,
    TwoPlayerBoardGame,
} from '../../game'
import { PauseEvent } from '../../game/event/PauseEvent'
import { ResumeEvent } from '../../game/event/ResumeEvent'
import { LongPressBox } from '../LongPressBox/LongPressBox'
import { useEffect, useState } from 'react'
import { StateLabel, StateThemeColor } from '../../common/constants'

export function ClockPageRibbon(props: ClockPageRibbonProps) {
    const { boardGame, ...otherProps } = props
    const [progress, setProgress] = useState<number>(0)
    const [labelA, setLabelA] = useState<string>(StateLabel.NOT_STARTED)
    const [labelB, setLabelB] = useState<string>(StateLabel.NOT_STARTED)
    const [labelColorA, setLabelColorA] = useState<string>(StateThemeColor.NOT_STARTED)
    const [labelColorB, setLabelColorB] = useState<string>(StateThemeColor.NOT_STARTED)

    useEffect(() => {
        const interval = setInterval(() => {
            if (!boardGame) {
                return
            }


            if (boardGame.isState(OngoingState)) {
                const playerA = boardGame.getPlayer(TwoPlayerBoardGame.ROLE_A)
                const playerB = boardGame.getPlayer(TwoPlayerBoardGame.ROLE_B)
                if (playerA.isPaused()) {
                    setLabelA(StateLabel.PAUSED)
                    setLabelColorA(StateThemeColor.PAUSED)
                } else {
                    setLabelA(StateLabel.ONGOING)
                    setLabelColorA(StateThemeColor.ONGOING)
                }

                if (playerB.isPaused()) {
                    setLabelB(StateLabel.PAUSED)
                    setLabelColorB(StateThemeColor.PAUSED)
                } else {
                    setLabelB(StateLabel.ONGOING)
                    setLabelColorB(StateThemeColor.ONGOING)
                }
            } else if (boardGame.isState(NotStartedState)) {
                setLabelA(StateLabel.NOT_STARTED)
                setLabelB(StateLabel.NOT_STARTED)
                setLabelColorA(StateThemeColor.NOT_STARTED)
                setLabelColorB(StateThemeColor.NOT_STARTED)
            } else if (boardGame.isState(PausedState)) {
                setLabelA(StateLabel.PAUSED)
                setLabelB(StateLabel.PAUSED)
                setLabelColorA(StateThemeColor.PAUSED)
                setLabelColorB(StateThemeColor.PAUSED)
            } else if (boardGame.isState(EndedState)) {
                setLabelA(StateLabel.ENDED)
                setLabelB(StateLabel.ENDED)
                setLabelColorA(StateThemeColor.ENDED)
                setLabelColorB(StateThemeColor.ENDED)
            }
        }, 60)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [boardGame])

    function handleInterval(duration: number, timeout: number) {
        setProgress(duration / timeout)
    }

    function handleTimeout() {
        setProgress(0)

        if (boardGame) {
            if (boardGame.isState(OngoingState)) {
                const pauseEvent = new PauseEvent({ role: '' })
                boardGame.getGameContext().eventManager.trigger(pauseEvent)
            } else if (boardGame.isState(PausedState)) {
                const resumeEvent = new ResumeEvent({ role: '' })
                boardGame.getGameContext().eventManager.trigger(resumeEvent)
            }
        }
    }

    function handleMouseUp() {
        setProgress(0)
    }

    return (
        <LongPressBox
            height="100%"
            display="flex"
            fontSize="1.25rem"
            intervalMs={16} // fps = 60
            timeoutMs={1000}
            intervalCallback={handleInterval}
            timeoutCallback={handleTimeout}
            mouseUpCallback={handleMouseUp}
            {...otherProps}
        >
            <Box height="100%" flex={1}>
                <RibbonLabel
                    label={labelA}
                    labelColor={labelColorA}
                    toTransform
                    progress={progress}
                />
            </Box>
            <Box height="100%" flex={1}>
                <RibbonLabel label={labelB} labelColor={labelColorB} progress={progress} />
            </Box>
        </LongPressBox>
    )
}

export interface ClockPageRibbonProps extends BoxProps {
    boardGame?: BoardGame
}

function RibbonLabel(props: RibbonLabelProps) {
    const { label, labelColor, toTransform = false, progress, ...otherProps } = props

    return (
        <Box
            position="relative"
            width="100%"
            height="100%"
            transform={toTransform ? 'rotate(180deg)' : ''}
            {...otherProps}
        >
            <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                userSelect="none"
                cursor="default"
                color={labelColor}
                zIndex="2"
            >
                <div color={labelColor}> {label} </div>
            </Box>
            <Box
                position="absolute"
                top="0"
                right="0"
                width={(progress * 100) + '%'}
                height="100%"
                bgColor="#ffffff"
                opacity={0.2}
                zIndex="1"
            />
        </Box>
    )
}

interface RibbonLabelProps extends BoxProps {
    label: string

    labelColor: string

    toTransform?: boolean

    // [0, 1]
    progress: number
}
