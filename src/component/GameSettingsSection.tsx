import React, { useState } from 'react'
import { Box } from '@mui/material'
import { AnyGame } from '@typinghare/board-game-clock-core'
import { PlayerSettingsSection } from './PlayerSettingsSection'
import { AdvancedSettingsSection } from './AdvancedSettingsSection'
import { GameSettingsHeader } from './GameSettingsHeader'
import { GameType } from '../redux/slice/GameSlice'

export type GameSettingsSectionProps = {
    game: AnyGame
    gametype: GameType
    onTimeChangeControl: (newTimeControlName: string) => void
}

export const GameSettingsSection: React.FC<GameSettingsSectionProps> = function(props): JSX.Element {
    const { game, gametype, onTimeChangeControl } = props

    const [signal, setSignal] = useState(true)

    function handleTimeControlChange(newTimeControlName: string): void {
        onTimeChangeControl(newTimeControlName)
    }

    function handleSettingChange(): void {
        setSignal(!signal)
    }

    return <Box>
        <GameSettingsHeader game={game} gametype={gametype} onTimeControlChange={handleTimeControlChange} />
        <PlayerSettingsSection game={game} role='A' signal={signal} onSettingChange={handleSettingChange} />
        <PlayerSettingsSection game={game} role='B' signal={signal} onSettingChange={handleSettingChange} />
        <AdvancedSettingsSection game={game} signal={signal} />
    </Box>
}