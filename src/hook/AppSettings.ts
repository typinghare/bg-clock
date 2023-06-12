import { SettingContainer } from '@typinghare/settings'
import { GameSettingProperties } from '@typinghare/board-game-clock-core'
import { LocalStorageKey } from '../common/constant'

export interface AppSettings {
    clockTimeFontSize: number
    clockBubbleSize: number
}

const appSettingsObject: AppSettings = JSON.parse((localStorage.getItem(LocalStorageKey.APP_SETTINGS) || '{}'))
const appSettingsContainer = new SettingContainer<AppSettings, GameSettingProperties>()

appSettingsContainer.addSetting('clockTimeFontSize', 15, {
    type: 'number',
    label: 'Clock Time Font Size',
    description: 'The font size of the clock time.',
    options: [12, 15, 20, 24],
})

appSettingsContainer.addSetting('clockBubbleSize', 20, {
    type: 'number',
    label: 'Clock Bubble Size',
    description: 'The size of the bubbles in the clock page.',
    options: [15, 20, 25, 30],
})


export function useAppSettings(): [
    SettingContainer<AppSettings, GameSettingProperties>,
    <K extends keyof AppSettings>(settingName: K, value: AppSettings[K]) => void
] {
    for (const settingName of Object.keys(appSettingsObject)) {
        const setting = appSettingsContainer.getSetting(settingName as keyof AppSettings)
        if (setting !== undefined) {
            // @ts-ignore
            setting.value = appSettingsObject[settingName]
        }
    }

    return [
        appSettingsContainer,
        function <K extends keyof AppSettings>(settingName: K, value: AppSettings[K]): void {
            appSettingsContainer.getSetting(settingName).value = value
            appSettingsObject[settingName] = value

            // Save to localStorage.
            const newAppSettingsObject: AppSettings = {} as AppSettings
            for (const settingName of Object.keys(appSettingsContainer.getSettings())) {
                newAppSettingsObject[settingName as keyof AppSettings]
                    = appSettingsContainer.getSetting(settingName as keyof AppSettings).value
            }

            // Save the object to the local storage.
            localStorage.setItem(LocalStorageKey.APP_SETTINGS, JSON.stringify(newAppSettingsObject))
        },
    ]
}