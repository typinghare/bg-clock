import { SettingGroup } from './Settings/SettingGroup'
import {
    GameSettingProperties,
    Player,
    StandardGameHolder,
    StandardGameSettings,
    TimeControl,
} from '@typinghare/board-game-clock-core'
import { SettingContainer } from '@typinghare/settings'
import { SettingItem, SettingItemType } from './Settings/SettingItem'

export interface PlayerSettingsSectionProps {
    gameHolder: StandardGameHolder
    player: Player
    signal: boolean
    onSettingChange: () => void
}

export function PlayerSettingsSection(props: PlayerSettingsSectionProps): JSX.Element {
    const { gameHolder, player, onSettingChange } = props
    const game = gameHolder.game
    const role = player.role
    const settingContainer = (player.timeControl as TimeControl).settings

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            // Update this player's setting.
            settingContainer.getSetting(settingName).value = newValue

            const gameSettings = game.settings as SettingContainer<StandardGameSettings, GameSettingProperties>
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
        const value = setting.value
        const type = setting.getProperty('type')
        const label = setting.getProperty('label')
        const description = setting.getProperty('description')
        const optionList = setting.getProperty('options')

        gameSettingControlArray.push(
            <SettingItem
                key={gameHolder.gameType + gameHolder.timeControlType + settingName}
                type={type as SettingItemType}
                value={value}
                onChange={handleValueChangeProvider(settingName)}
                label={label}
                description={description}
                optionList={optionList}
            />,
        )
    }

    return (
        <SettingGroup
            title={`Player ${role} Time Control Settings`}
            children={gameSettingControlArray}
        />
    )
}