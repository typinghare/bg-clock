import { Page, PageEnum } from '../Page'
import { selectBoardGameChangedSignal, selectTimeControlChangedSignal, useAppSelector } from '../../redux'
import { Box } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { ClockDisplay } from './ClockDisplay'
import { BoardGame, TwoPlayerBoardGame } from '../../game'
import { useEffect, useState } from 'react'
import { boardGameHolder } from '../../common/holder'

/**
 * Clock page.
 */
export function ClockPage() {
    const boardGameChangedSignal = useAppSelector(selectBoardGameChangedSignal)
    const timeControlChangedSignal = useAppSelector(selectTimeControlChangedSignal)
    const [boardGame, setBoardGame] = useState<BoardGame | undefined>(undefined)
    const styles: StyleMap = {
        section: {
            flex: 12,
            userSelect: 'none',
        },
        ribbon: {
            flex: 1,
            backgroundColor: '#333333',
            userSelect: 'none',
        },
        sectionA: {
            transform: 'rotate(180deg)',
        },
    }

    useEffect(() => {
        const currentBoardGame = boardGameHolder.get()
        setBoardGame(currentBoardGame)
    }, [boardGameChangedSignal, timeControlChangedSignal])

    if (!boardGame) {
        return (<Page page={PageEnum.CLOCK} />)
    }

    return (
        <Page page={PageEnum.CLOCK}>
            <Box sx={styles.section}>
                <ClockDisplay
                    role={TwoPlayerBoardGame.ROLE_A}
                    sx={styles.sectionA}
                />
            </Box>

            <Box sx={styles.ribbon} />

            <Box sx={styles.section}>
                <ClockDisplay
                    role={TwoPlayerBoardGame.ROLE_B}
                />
            </Box>
        </Page>
    )
}