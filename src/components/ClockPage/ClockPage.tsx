import { Page, PageEnum } from '../Page'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import { Box, useBoolean } from '@chakra-ui/react'
import { ClockDisplay } from './ClockDisplay'
import {
    BoardGame,
    EndedState,
    NotStartedState,
    OngoingState,
    PausedState,
    TwoPlayerBoardGame,
} from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'
import { StateThemeColor, TimeColor } from '../../common/constants'
import { ClockPageRibbon } from './ClockPageRibbon'

/**
 * Clock page.
 */
export function ClockPage() {
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const [isRibbonOpen, setRibbon] = useBoolean()
    const [ribbonLabel, setRibbonLabel] = useState<string>('Not Started')
    const [ribbonColor, setRibbonColor] = useState<string>(StateThemeColor.NOT_STARTED)

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
    }, [boardGameChangedSignal, timeControlChangedSignal])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!boardGame) {
                return
            }

            if (boardGame.isState(NotStartedState)) {
                setRibbonLabel('Not Started')
                setRibbonColor(StateThemeColor.NOT_STARTED)
            } else if (boardGame.isState(OngoingState)) {
                setRibbonLabel('Ongoing')
                setRibbonColor(StateThemeColor.ONGOING)
            } else if (boardGame.isState(PausedState)) {
                setRibbonLabel('Paused')
                setRibbonColor(StateThemeColor.PAUSED)
            } else if (boardGame.isState(EndedState)) {
                setRibbonLabel('Ended')
                setRibbonColor(StateThemeColor.ENDED)
            }
        }, 60)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [boardGame])

    if (!boardGame) {
        return (<Page page={PageEnum.CLOCK} />)
    }

    return (
        <Page page={PageEnum.CLOCK}>
            <Box flex={9} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_A} transform="rotate(180deg)" />
            </Box>
            <Box
                flex={1}
                backgroundColor={TimeColor.TIME_RUNNING_COLOR}
                userSelect="none"
                onClick={setRibbon.on}
            >
                <ClockPageRibbon
                    boardGame={boardGame}
                    isOpen={isRibbonOpen}
                    onClose={setRibbon.off}
                    label={ribbonLabel}
                    color={ribbonColor}
                />
            </Box>
            <Box flex={9} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_B} />
            </Box>
        </Page>
    )
}
