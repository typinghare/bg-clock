import { SettingContainer } from '@typinghare/settings'
import { GameSettingProperties } from '@typinghare/board-game-clock-core'
import { LocalStorageKey } from '../common/constant'

export interface AppSettings {
    isTime: boolean
}

export function UseAppSettings(): [
    SettingContainer<AppSettings, GameSettingProperties>,
    <K extends keyof AppSettings>(settingName: K, value: AppSettings[K]) => void
] {
    const appSettingsObject: AppSettings = JSON.parse((localStorage.getItem(LocalStorageKey.APP_SETTINGS) || '{}'))
    const appSettingsContainer = new SettingContainer<AppSettings, GameSettingProperties>()
    for (const settingName in Object.keys(appSettingsObject)) {
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

            // Save to localStorage.
            const newAppSettingsObject: AppSettings = {} as AppSettings
            for (const settingName in Object.keys(appSettingsContainer.getSettings())) {
                newAppSettingsObject[settingName as keyof AppSettings]
                    = appSettingsContainer.getSetting(settingName as keyof AppSettings).value
            }

            // Save the object to the local storage.
            localStorage.setItem(LocalStorageKey.APP_SETTINGS, JSON.stringify(newAppSettingsObject))
        },
    ]
}