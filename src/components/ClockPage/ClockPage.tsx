import { Page, PageEnum } from '../Page'
import {
    selectBoardGameChangedSignal,
    selectTimeControlChangedSignal,
    useAppSelector,
} from '../../redux'
import { Box } from '@chakra-ui/react'
import { ClockDisplay } from './ClockDisplay'
import { BoardGame, TwoPlayerBoardGame } from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'
import { TimeColor } from '../../common/constants'

/**
 * Clock page.
 */
export function ClockPage() {
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
    }, [boardGameChangedSignal, timeControlChangedSignal])

    if (!boardGame) {
        return (<Page page={PageEnum.CLOCK} />)
    }

    return (
        <Page page={PageEnum.CLOCK}>
            <Box flex={12} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_A} transform="rotate(180deg)" />
            </Box>
            <Box flex={1} backgroundColor={TimeColor.TIME_RUNNING_COLOR} userSelect="none" />
            <Box flex={12} userSelect="none">
                <ClockDisplay role={TwoPlayerBoardGame.ROLE_B} />
            </Box>
        </Page>
    )
}
