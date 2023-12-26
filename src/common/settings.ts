import { DataCollection, Datum } from '@typinghare/extrum'
import { BoardGameSettingsMetadata } from '../game'

export const settings = new DataCollection<SettingsData, BoardGameSettingsMetadata>({
    clockTimeFontSize: Datum.of(18).setMetadata({
        type: 'number',
        label: 'Clock Time Font Size',
        description: 'The font size of the clock time.',
        optionList: [12, 15, 18, 20, 24, 28],
    }),
})

export interface SettingsData {
    clockTimeFontSize: number
}

/**
 * Extract saved data from local storage.
 */
export function extraSettingsFromLocalStorage() {
    const settingsItem: string | null = localStorage.getItem('settings')
    if (!settingsItem) {
        return
    }

    const object: SettingsData = JSON.parse(settingsItem)
    for (const key of Object.keys(object)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        settings.getDatum(key).setValue(object[key])
    }
}

extraSettingsFromLocalStorage()

/**
 * Saves settings to the local storage.
 */
export function saveSettingsToLocalStorage() {
    const data = settings.getData()
    const object: Partial<SettingsData> = {}
    for (const key of Object.keys(data)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        object[key] = (data[key] as Datum).getValue()
    }
    localStorage.setItem('settings', JSON.stringify(object))
}