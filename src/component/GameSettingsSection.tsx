import React, { useState } from 'react'
import { Box } from '@mui/material'
import { StandardGameHolder } from '@typinghare/board-game-clock-core'
import { PlayerSettingsSection } from './PlayerSettingsSection'
import { AdvancedSettingsSection } from './AdvancedSettingsSection'
import { GameSettingsHeader } from './GameSettingsHeader'

export type GameSettingsSectionProps = {
    gameHolder: StandardGameHolder
    onTimeChangeControl: (newTimeControlName: string) => void
}

export const GameSettingsSection: React.FC<GameSettingsSectionProps> = function(props): JSX.Element {
    const { gameHolder, onTimeChangeControl } = props
    const game = gameHolder.game

    const [signal, setSignal] = useState(true)

    function handleTimeControlChange(newTimeControlName: string): void {
        onTimeChangeControl(newTimeControlName)
    }

    function handleSettingChange(): void {
        setSignal(!signal)
    }

    return <Box>
        <GameSettingsHeader
            gameHolder={gameHolder}
            onTimeControlChange={handleTimeControlChange}
        />
        <PlayerSettingsSection
            gameHolder={gameHolder}
            player={game.getPlayer('A')}
            signal={signal}
            onSettingChange={handleSettingChange}
        />
        <PlayerSettingsSection
            gameHolder={gameHolder}
            player={game.getPlayer('B')}
            signal={signal}
            onSettingChange={handleSettingChange}
        />
        <AdvancedSettingsSection
            game={game}
            signal={signal}
        />
    </Box>
}