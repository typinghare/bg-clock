import { TimeControl } from '../../TimeControl'
import { Player, PlayerSettings, Role } from '../../Player'
import { Datum } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

/**
 * Byoyomi time control.
 */
export class ByoyomiTimeControl extends TimeControl {
    public override createPlayer(role: Role): Player<ByoyomiPlayerSettings> {
        return new Player<ByoyomiPlayerSettings>(role, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                label: 'Main Time',
            }),
        })
    }
}

/**
 * Byoyomi time control player settings.
 */
export interface ByoyomiPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
}