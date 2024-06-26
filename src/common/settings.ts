import { DataCollection, Datum } from '@typinghare/extrum'
import { BoardGameSettingsMetadata } from '../game'
import { LocalStorageKey } from './constants'

export interface SettingsData {
    clockTimeFontSize: number
    bubbleSize: number
    fullScreen: boolean
    screenAlwaysOn: boolean
    tapAudio: boolean
    countdownAudio: boolean
}

export const settings = new DataCollection<SettingsData, BoardGameSettingsMetadata>({
    clockTimeFontSize: Datum.of(18).setMetadata({
        type: 'number',
        label: 'Clock Time Font Size',
        description: 'The font size of the clock time.',
        optionList: [12, 15, 18, 20, 24, 28],
    }),
    bubbleSize: Datum.of(20).setMetadata({
        type: 'number',
        label: 'Clock Bubble Size',
        description: 'The size of the bubbles in the clock page.',
        optionList: [12, 15, 18, 20, 24, 28],
    }),
    fullScreen: Datum.of(true).setMetadata({
        type: 'bool',
        label: 'Clock Page Full Screen',
        description: 'Whether to enter full screen mode when the game starts.',
    }),
    screenAlwaysOn: Datum.of(true).setMetadata({
        type: 'bool',
        label: 'Screen Always On',
        description: 'When turned on, the screen is always on when the clock is running',
    }),
    tapAudio: Datum.of(true).setMetadata({
        type: 'bool',
        label: 'Tap Audio',
        description: 'Play a tap audio when players tap.',
    }),
    countdownAudio: Datum.of(true).setMetadata({
        type: 'bool',
        label: 'Countdown Audio',
        description: 'Plays countdown audios when the remaining time is less than 10 seconds.',
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
