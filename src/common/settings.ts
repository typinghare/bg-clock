import { DataCollection, Datum } from '@typinghare/extrum'
import { BoardGameSettingsMetadata } from '../game'
import { LocalStorageKey } from './constants'

export interface SettingsData {
    clockTimeFontSize: number
    fullScreen: boolean
}

export const settings = new DataCollection<SettingsData, BoardGameSettingsMetadata>({
    clockTimeFontSize: Datum.of(18).setMetadata({
        type: 'number',
        label: 'Clock Time Font Size',
        description: 'The font size of the clock time.',
        optionList: [12, 15, 18, 20, 24, 28],
    }),
    fullScreen: Datum.of(false).setMetadata({
        type: 'bool',
        label: 'Full Screen',
        description: 'Whether to enter full screen mode when the game starts.',
    }),
})

/**
 * Loads saved data from local storage.
 */
export function loadSettingsFromLocalStorage() {
    const settingsItem: string | null = localStorage.getItem(LocalStorageKey.SETTINGS)
    if (!settingsItem) {
        return
    }

    const object: SettingsData = JSON.parse(settingsItem)
    for (const key of Object.keys(object)) {
        // @ts-ignore
        settings.getDatum(key).setValue(object[key])
    }
}

/**
 * Saves settings to the local storage.
 */
export function saveSettingsToLocalStorage() {
    localStorage.setItem(LocalStorageKey.SETTINGS, JSON.stringify(settings.getData()))
}

if (localStorage.getItem(LocalStorageKey.SETTINGS)) {
    loadSettingsFromLocalStorage()
} else {
    saveSettingsToLocalStorage()
}
