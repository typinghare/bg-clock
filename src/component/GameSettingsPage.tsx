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
import { GameSettingsContent } from './Settings/GameSettingsContent'

export const standardGameContainer = new StandardGameContainer()

export function GameSettingsPage(): JSX.Element {

    // Retrieve game type from redux.
    const gameType: StandardGameType = useAppSelector(selectGameType)

    // Get time control types from standard game container.
    const timeControlTypeArray: TimeControlType[] = standardGameContainer.getTimeControls(gameType)

    // Create time control state and create a corresponding game.
    const [timeControlType, setTimeControlType] = useState<TimeControlType>(timeControlTypeArray[0])
    const gameSupplier: GameSupplier = standardGameContainer.getGameSupplier(gameType, timeControlType as never)
    const game = gameSupplier() as Game

    // Create a game holder.
    const gameHolder = new StandardGameHolder(gameType, timeControlType, game)

    function handleTimeControlChange(newTimeControlType: TimeControlType): void {
        setTimeControlType(newTimeControlType)
    }

    const styles: MuiStyles<'container'> = {
        container: {
            height: '100%',
            padding: '1em',
            backgroundColor: '#E5E5E5',
        },
    }

    return (
        <Page pageIndex={PageEnum.GAME_SETTINGS}>
            <Box sx={styles.container}>
                <GameSettingsContent
                    gameHolder={gameHolder}
                    onTimeControlChange={handleTimeControlChange}
                />
            </Box>
        </Page>
    )
}