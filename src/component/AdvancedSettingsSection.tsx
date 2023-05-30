import React from 'react'
import { SettingsSection } from './SettingsSection'
import { AnyGame } from '@typinghare/board-game-clock-core'
import { GameSettingControl } from './GameSettingControl'

export type GameSettingsSectionProps = {
    game: AnyGame
    signal: boolean
}

export const AdvancedSettingsSection: React.FC<GameSettingsSectionProps> = function(props): JSX.Element {
    const { game, signal } = props
    const gameSettings = game.settings.getSettings()

    const settingControlArray: JSX.Element[] = []
    for (const [settingName, setting] of Object.entries(gameSettings)) {
        settingControlArray.push(<GameSettingControl key={settingName} setting={setting} signal={signal} />)
    }

    return <SettingsSection title='Advanced Game Settings' children={settingControlArray} />
}

