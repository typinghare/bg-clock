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
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectGameType, selectTimeControlType, setTimeControlType } from '../redux/slice/GameSlice'
import { MuiStyles } from '../common/interfaces'
import { GameSettingsContent } from './GameSettingsContent'
import { Navigation } from './Common/Navigation'

export const standardGameContainer = new StandardGameContainer()

export function GameSettingsPage(): JSX.Element {
    const dispatch = useAppDispatch()

    // Retrieve game type and time control type from Redux.
    const gameType: StandardGameType = useAppSelector(selectGameType)
    const timeControlType: string = useAppSelector(selectTimeControlType)
    const timeControlTypeArray: TimeControlType[] = standardGameContainer.getTimeControls(gameType)

    if (!timeControlTypeArray.includes(timeControlType)) {
        dispatch(setTimeControlType(timeControlTypeArray[0]))
    }

    // Create a game from the game type and time control type.
    const gameSupplier: GameSupplier = standardGameContainer.getGameSupplier(gameType, timeControlType as never)
    const game = gameSupplier() as Game

    // Create a game holder.
    const gameHolder = new StandardGameHolder(gameType, timeControlType, game)

    const styles: MuiStyles<'container'> = {
        container: {
            height: '100%',
            padding: '2em 1em',
            backgroundColor: '#EAEAEA',
        },
    }

    return (
        <Page pageIndex={PageEnum.GAME_SETTINGS}>
            <Navigation
                previousPage={PageEnum.GAME_SELECT}
                title={'Game Settings'}
            />

            <Box sx={styles.container}>
                <GameSettingsContent
                    gameHolder={gameHolder}
                />
            </Box>
        </Page>
    )
}

// export interface GameSettingContentWrapperProps {
//     gameHolder: StandardGameHolder
// }
//
// export function GameSettingContentWrapper(props: GameSettingContentWrapperProps): JSX.Element {
//     return (
//         <GameSettingsContent
//             gameHolder={gameHolder}
//             onTimeControlChange={handleTimeControlChange}
//         />
//     )
// }