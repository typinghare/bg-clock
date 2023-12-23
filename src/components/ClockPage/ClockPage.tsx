import { Page, PageEnum } from '../Page/Page'
import { selectSignal, useAppSelector } from '../../redux'
import { useBoardGame } from '../../state/useBoardGame'
import { Box } from '@chakra-ui/react'
import { StyleMap } from '../../common/style'
import { ClockDisplay } from './ClockDisplay'
import { TwoPlayerBoardGame } from '../../game'

/**
 * Clock page.
 */
export function ClockPage() {
    useAppSelector(selectSignal)
    const [boardGame] = useBoardGame()
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

    if (!boardGame) {
        return (<Page page={PageEnum.CLOCK} />)
    }

    // Enable full screen.
    // if (screenfull.isEnabled) {
    //     screenfull.request().then().catch(e => {
    //         console.log(e)
    //         // Here a `TypeError` will be thrown,
    //         // but it does not hurt the app so just ignore it
    //     })
    // }

    return (
        <Page page={PageEnum.CLOCK}>
            <Box sx={styles.section}>
                <ClockDisplay
                    player={boardGame.getPlayer(TwoPlayerBoardGame.ROLE_A)}
                    sx={styles.sectionA}
                />
            </Box>

            <Box sx={styles.ribbon} />

            <Box sx={styles.section}>
                <ClockDisplay
                    player={boardGame.getPlayer(TwoPlayerBoardGame.ROLE_B)}
                />
            </Box>
        </Page>
    )
}