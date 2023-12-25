import { DataCollection, Datum } from '@typinghare/extrum'
import { BoardGameSettingsMetadata } from '../game'

export const settings = new DataCollection<SettingsData, BoardGameSettingsMetadata>({
    clockTimeFontSize: Datum.of(20).setMetadata({
        type: 'number',
        label: 'Clock Time Font Size',
        description: 'The font size of the clock time.',
        optionList: [12, 15, 18, 20, 24],
    }),
})

export interface SettingsData {
    clockTimeFontSize: number
}