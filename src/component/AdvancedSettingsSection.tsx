import React from 'react'
import { SettingsSection } from './SettingsSection'
import { GameSettingControl } from './GameSettingControl'
import { Game } from '@typinghare/board-game-clock-core'
import { Setting, SettingMap } from '@typinghare/settings'

export type GameSettingsSectionProps = {
    game: Game
    signal: boolean
}

export const AdvancedSettingsSection: React.FC<GameSettingsSectionProps> = function(props): JSX.Element {
    const { game, signal } = props
    const gameClassName = Object.getPrototypeOf(game).constructor.name
    const gameSettings = game.settings.getSettings()

    const settingControlArray: JSX.Element[] = []
    for (const [settingName, setting] of Object.entries(gameSettings)) {
        settingControlArray.push(<GameSettingControl
            key={gameClassName + settingName}
            setting={setting as Setting<any, any>}
            signal={signal}
        />)
    }

    return <SettingsSection title='Advanced Game Settings' children={settingControlArray} />
}

