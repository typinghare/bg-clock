import { Game, GameSettingProperties, StandardGameSettings } from '@typinghare/board-game-clock-core'
import { SettingItem, SettingItemType } from './Settings/SettingItem'
import { SettingContainer, SettingMap } from '@typinghare/settings'
import { SettingGroup } from './Settings/SettingGroup'

export interface AdvancedSettingsSectionProps {
    game: Game
    signal: boolean
    onSettingChange: () => void
}

export function AdvancedSettingsSection(props: AdvancedSettingsSectionProps): JSX.Element {
    const { game, onSettingChange } = props
    const gameClassName = Object.getPrototypeOf(game).constructor.name
    const settingContainer = game.settings as SettingContainer<any>
    const gameSettings = game.settings.getSettings() as SettingMap<StandardGameSettings, GameSettingProperties>

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            // Update this player's setting.
            settingContainer.getSetting(settingName).value = newValue

            onSettingChange()
        }
    }

    const settingItemArray: JSX.Element[] = []
    for (const [settingName, setting] of Object.entries(gameSettings)) {
        const value = setting.value
        const type = setting.getProperty('type')
        const label = setting.getProperty('label')
        const description = setting.getProperty('description')

        settingItemArray.push(
            // @ts-ignore
            <SettingItem
                key={gameClassName + settingName}
                type={type as SettingItemType}
                value={value}
                onChange={handleValueChangeProvider(settingName)}
                label={label}
                description={description}
            />,
        )
    }

    return (
        <SettingGroup
            title='Advanced Game Settings'
            children={settingItemArray}
        />
    )
}