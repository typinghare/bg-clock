import React from 'react'
import { Page, PageProps } from './Page'
import { Box } from '@mui/material'
import { ClockDisplay } from './ClockDisplay'
import { useAppSelector } from '../redux/hooks'
import { selectGameStarted } from '../redux/slice/GameSlice'
import { GameHolder } from '@typinghare/board-game-clock-core'
import { useGameHolder } from '../state/GameHolder'

export const ClockPage = function(props: PageProps): JSX.Element {
    const { isDisplay } = props
    const [getGameHolder] = useGameHolder()

    // If the game has not been started, display nothing.
    if (!useAppSelector(selectGameStarted)) {
        return <Page isDisplay={isDisplay}>The game has not been started</Page>
    }

    const gameHolder: GameHolder<any> | undefined = getGameHolder()

    // Retrieve the game from the game holder.
    if (gameHolder === undefined) {
        return <Page isDisplay={isDisplay}>
            <Box> Global game holder in empty.</Box>
        </Page>
    }

    const game = gameHolder.game

    const styles = {
        section: { flex: 12 },
        ribbon: { flex: 1, backgroundColor: '#333333' },
    }

    return <Page isDisplay={isDisplay}>
        <Box sx={styles.section}>
            <ClockDisplay game={game} role='A' overturn />
        </Box>
        <Box sx={styles.ribbon} />
        <Box sx={styles.section}>
            <ClockDisplay game={game} role='B' />
        </Box>
    </Page>
}

