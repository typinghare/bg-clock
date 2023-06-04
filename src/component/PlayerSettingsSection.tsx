import React from 'react'
import { Player, StandardGameHolder, StandardGameSettings, TimeControl } from '@typinghare/board-game-clock-core'
import { GameSettingControl } from './GameSettingControl'
import { SettingsSection } from './SettingsSection'
import { SettingContainer } from '@typinghare/settings'

export type PlayerSettingsSectionProps = {
    gameHolder: StandardGameHolder
    player: Player
    signal: boolean
    onSettingChange: () => void
}

export const PlayerSettingsSection: React.FC<PlayerSettingsSectionProps> = function(props): JSX.Element {
    const { gameHolder, player, signal, onSettingChange } = props
    const game = gameHolder.game
    const role = player.role
    const settingContainer = (player.timeControl as TimeControl).settings

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            // Update this player's setting.
            settingContainer.getSetting(settingName).value = newValue

            const gameSettings = game.settings as SettingContainer<StandardGameSettings>
            if (gameSettings.getSetting('synchronizePlayerSettings').value === true) {
                // Update another player's setting.
                const anotherPlayer: Player = game.getPlayer(game.getNextRole(role))
                const anotherPlayerSettings = (anotherPlayer.timeControl as TimeControl).settings
                anotherPlayerSettings.getSetting(settingName).setValue(newValue, true)

                // Invokes on setting change.
                onSettingChange()
            }
        }
    }

    const gameSettingControlArray: JSX.Element[] = []
    const settingNames = Object.keys(settingContainer.getSettings())
    for (const settingName of settingNames) {
        const setting = settingContainer.getSetting(settingName)
        gameSettingControlArray.push(<GameSettingControl
            key={gameHolder.gameType + gameHolder.timeControlType + settingName}
            setting={setting}
            signal={signal}
            onValueChange={handleValueChangeProvider(settingName)}
        />)
    }

    return <SettingsSection title={`Player ${role} Time Control Settings`} children={gameSettingControlArray} />
}