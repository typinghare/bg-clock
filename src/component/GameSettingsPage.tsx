import { Page } from './Page'
import { PageEnum } from '../redux/slice/PageSlice'
import { Box } from '@mui/material'
import {
    Game,
    GameSupplier,
    StandardGameContainer,
    StandardGameHolder,
    StandardGameType,
    TimeControlType,
} from '@typinghare/board-game-clock-core'
import { useAppSelector } from '../redux/hooks'
import { selectGameType } from '../redux/slice/GameSlice'
import { useState } from 'react'
import { MuiStyles } from '../common/interfaces'
import { GameSettingsContent } from './GameSettingsContent'
import { AppNavigation } from './Common/AppNavigation'

export const standardGameContainer = new StandardGameContainer()

export function GameSettingsPage(): JSX.Element {
    // Retrieve game type from redux.
    const gameType: StandardGameType = useAppSelector(selectGameType)

    const styles: MuiStyles<'navigation' | 'container'> = {
        navigation: {},
        container: {
            height: '100%',
            padding: '2em 1em',
            backgroundColor: '#EAEAEA',
        },
    }

    return (
        <Page pageIndex={PageEnum.GAME_SETTINGS}>
            <AppNavigation
                sx={styles.navigation}
                previousPage={PageEnum.GAME_SELECT}
                title={'Game Settings'}
            />

            <Box sx={styles.container}>
                <TimeControlSeparator gameType={gameType} />
            </Box>
        </Page>
    )
}

export interface TimeControlSeparatorProps {
    gameType: StandardGameType
}

export function TimeControlSeparator(props: TimeControlSeparatorProps): JSX.Element {
    const { gameType } = props

    // Get time control types from standard game container.
    const timeControlTypeArray: TimeControlType[] = standardGameContainer.getTimeControls(gameType)
    const [timeControlType, setTimeControlType] = useState<TimeControlType>(timeControlTypeArray[0])

    const gameSupplier: GameSupplier
        = timeControlTypeArray.includes(timeControlType) ?
        standardGameContainer.getGameSupplier(gameType, timeControlType as never) :
        standardGameContainer.getGameSupplier(gameType, timeControlTypeArray[0] as never)
    // const gameSupplier: GameSupplier = standardGameContainer.getGameSupplier(gameType, timeControlType as never)
    const game = gameSupplier() as Game

    // Create a game holder.
    const gameHolder = timeControlTypeArray.includes(timeControlType) ?
        new StandardGameHolder(gameType, timeControlType, game) :
        new StandardGameHolder(gameType, timeControlTypeArray[0], game)

    function handleTimeControlChange(newTimeControlType: TimeControlType): void {
        setTimeControlType(newTimeControlType)
    }

    return (
        <Box>
            <GameSettingsContent
                gameHolder={gameHolder}
                onTimeControlChange={handleTimeControlChange}
            />
        </Box>
    )
}