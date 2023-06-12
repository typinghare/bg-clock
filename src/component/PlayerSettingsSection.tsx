import { SettingGroup } from './Settings/SettingGroup'
import { Player, StandardGameHolder, TimeControl } from '@typinghare/board-game-clock-core'
import { SettingItem, SettingItemType } from './Settings/SettingItem'
import { BoxProps } from '@mui/material'

export interface PlayerSettingsSectionProps extends BoxProps {
    gameHolder: StandardGameHolder
    player: Player
    signal: boolean
    onSettingChange: () => void
    playerSynchronized: boolean
}

export function PlayerSettingsSection(props: PlayerSettingsSectionProps): JSX.Element {
    const { gameHolder, player, signal, onSettingChange, playerSynchronized, ...otherProps } = props
    const game = gameHolder.game
    const role = player.role
    const settingContainer = (player.timeControl as TimeControl).settings

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            // Update this player's setting.
            settingContainer.getSetting(settingName).value = newValue

            if (playerSynchronized) {
                // Update another player's setting.
                const anotherPlayer: Player = game.getPlayer(game.getNextRole(role))
                const anotherPlayerSettings = (anotherPlayer.timeControl as TimeControl).settings
                anotherPlayerSettings.getSetting(settingName).setValue(newValue, true)
            }

            // Invokes on setting change.
            onSettingChange()
        }
    }

    const gameSettingControlArray: JSX.Element[] = []
    const settingNames = Object.keys(settingContainer.getSettings())
    const settingSize = settingNames.length
    for (let i = 0; i < settingSize; i++) {
        const settingName = settingNames[i]
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
                isLastElementInGroup={i === settingSize - 1}
            />,
        )
    }

    const title = playerSynchronized ? 'Time Control Settings' : `Player ${role} Time Control Settings`
    const description = playerSynchronized ? 'The time control settings will be synchronized for both players.' : ''

    return (
        <SettingGroup
            title={title}
            description={description}
            children={gameSettingControlArray}
            {...otherProps}
        />
    )
}