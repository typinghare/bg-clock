import { Page, PageEnum } from '../Page'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import { Box, useBoolean } from '@chakra-ui/react'
import { ClockDisplay } from './ClockDisplay'
import { BoardGame, TwoPlayerBoardGame } from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'
import { TimeColor } from '../../common/constants'
import { ClockPageRibbon } from './ClockPageRibbon'

/**
 * Clock page.
 */
export function ClockPage() {
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const [isRibbonOpen, setRibbon] = useBoolean()

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
    }, [boardGameChangedSignal, timeControlChangedSignal])

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
                />
            </Box>
            <Box flex={9} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_B} />
            </Box>
        </Page>
    )
}
