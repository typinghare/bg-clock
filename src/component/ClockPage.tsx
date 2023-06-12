import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'
import { useGameHolder } from '../hook/GameHolder'
import { selectGameStarted } from '../redux/slice/GameSlice'
import { useAppSelector } from '../redux/hooks'
import { GameHolder } from '@typinghare/board-game-clock-core'
import { Box } from '@mui/material'
import { ClockDisplay } from './ClockDisplay'
import { MuiStyles } from '../common/interfaces'
import screenfull from 'screenfull'

export function ClockPage(): JSX.Element {
    const [getGameHolder] = useGameHolder()

    // If the game has not been started, display nothing.
    if (!useAppSelector(selectGameStarted)) {
        return (
            <Page pageIndex={PageEnum.CLOCK}>
                <h1>
                    The game has not been started
                </h1>
            </Page>
        )
    }

    const gameHolder: GameHolder<any> | undefined = getGameHolder()

    // Retrieve the game from the game holder.
    if (gameHolder === undefined) {
        return (
            <Page pageIndex={PageEnum.CLOCK}>
                <h1>
                    The game holder is empty.
                </h1>
            </Page>
        )
    }

    const game = gameHolder.game
    const styles: MuiStyles<'section' | 'ribbon' | 'sectionAClockDisplay'> = {
        section: {
            flex: 12,
            userSelect: 'none',
        },
        ribbon: {
            flex: 1,
            backgroundColor: '#333333',
            userSelect: 'none',
        },
        sectionAClockDisplay: {
            transform: 'rotate(180deg)',
        },
    }

    // Enable full screen.
    if (screenfull.isEnabled) {
        screenfull.request().then(() => {
        }).catch(_ => {
            // Here a `TypeError` will be thrown, but it does not hurt the app so just ignore it.
        })
    }

    return (
        <Page pageIndex={PageEnum.CLOCK}>
            <Box sx={styles.section}>
                <ClockDisplay game={game} role={'A'} sx={styles.sectionAClockDisplay} />
            </Box>

            <Box sx={styles.ribbon} />

            <Box sx={styles.section}>
                <ClockDisplay game={game} role={'B'} />
            </Box>
        </Page>
    )
}