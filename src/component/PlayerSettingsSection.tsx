import React from 'react'
import { AnyGame, Player, TimeControl } from '@typinghare/board-game-clock-core'
import { GameSettingControl } from './GameSettingControl'
import { SettingsSection } from './SettingsSection'

export type PlayerSettingsSectionProps = {
    game: AnyGame,
    role: string,
    signal: boolean,
    onSettingChange: () => void
}

export const PlayerSettingsSection: React.FC<PlayerSettingsSectionProps> = function(props): JSX.Element {
    const { game, role, signal, onSettingChange } = props
    const player: Player = game.getPlayer(role)
    const settingContainer = (player.timeControl as TimeControl<any>).settings

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            settingContainer.getSetting(settingName).value = newValue

            // Update another player's setting.
            const anotherPlayer: Player = game.getPlayer(game.getNextRole(role))
            const anotherPlayerSettings = (anotherPlayer.timeControl as TimeControl<any>).settings
            anotherPlayerSettings.getSetting(settingName).setValue(newValue, true)

            // Invokes on setting change.
            onSettingChange()
        }
    }

    const gameSettingControlArray: JSX.Element[] = []
    const settingNames = Object.keys(settingContainer.getSettings())
    for (const settingName of settingNames) {
        const setting = settingContainer.getSetting(settingName)
        gameSettingControlArray.push(<GameSettingControl
            key={settingName}
            setting={setting}
            signal={signal}
            onValueChange={handleValueChangeProvider(settingName)}
        />)
    }

    return <SettingsSection title={`Player ${role} Time Control Settings`} children={gameSettingControlArray} />
}