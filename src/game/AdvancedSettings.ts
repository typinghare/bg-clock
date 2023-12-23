import { DataCollection, Datum } from '@typinghare/extrum'
import { BoardGameSettingsMetadata } from './BoardGame'

/**
 * Advanced settings.
 */
export class AdvancedSettings extends DataCollection<AdvancedSettingsData, BoardGameSettingsMetadata> {
    public constructor() {
        super({
            sync: Datum.of(true).setMetadata({
                type: 'bool',
                label: 'Synchronize Player Settings',
                description: 'When activated, the settings of two players will be synchronized.',
            }),
        })
    }
}

/**
 * Advanced settings data.
 */
export interface AdvancedSettingsData {
    sync: boolean
}