import React, { useState } from 'react'
import { Page, PageProps } from './Page'
import { useAppSelector } from '../redux/hooks'
import { selectGameType } from '../redux/slice/GameSlice'
import {
    Game,
    GameSupplier,
    StandardGameContainer,
    StandardGameHolder,
    StandardGameType,
    TimeControlType,
} from '@typinghare/board-game-clock-core'
import { GameSettingsHeader } from './GameSettingsHeader'
import { PlayerSettingsSection } from './PlayerSettingsSection'
import { AdvancedSettingsSection } from './AdvancedSettingsSection'
import { useSignal } from '../state/Signal'
import { Box, SxProps } from '@mui/material'

export const standardGameContainer = new StandardGameContainer()

export const GameSettingsPage = function(props: PageProps): JSX.Element {
    const { isDisplay } = props

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

    const [signal, setSignal] = useSignal()
    const style: SxProps = {
        padding: '1.5em 1em 0 1em', backgroundColor: '#dcdcdd',
        display: 'block !important',
        overflowY: 'scroll !important',
        height: '2000px !important',
        scrollWidth : 'none',
        scrollbarWidth: ''
    }

    return <Page isDisplay={isDisplay}>
        <Box sx={style}>
            <GameSettingsHeader
                gameHolder={gameHolder}
                onTimeControlChange={handleTimeControlChange}
            />
            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('A')}
                signal={signal}
                onSettingChange={setSignal}
            />
            <PlayerSettingsSection
                gameHolder={gameHolder}
                player={game.getPlayer('B')}
                signal={signal}
                onSettingChange={setSignal}
            />
            <AdvancedSettingsSection
                game={game}
                signal={signal}
            />
        </Box>
    </Page>
}