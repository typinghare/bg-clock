import { TimeControl } from '../../TimeControl'
import { Player, PlayerSettings, Role } from '../../Player'
import { Datum } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

/**
 * Yingshi time control.
 */
export class YingshiTimeControl extends TimeControl {
    public override createPlayer(role: Role): Player<YingshiPlayerSettings> {
        return new Player<YingshiPlayerSettings>(role, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                type: 'time',
                label: 'Main Time',
                description: '',
            }),
        })
    }

    public override getName(): string {
        return 'Yingshi'

    }

    public override getDescription(): string {
        return 'Yingshi Bei time control begins with an initial time pool. When this time is used up, players face ' +
            'successive stages, each with its own time limit. Not moving within a stage results in penalties, with ' +
            'the stages resetting in subsequent turns.'
    }
}

/**
 * Yingshi time control player settings.
 */
export interface YingshiPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
}