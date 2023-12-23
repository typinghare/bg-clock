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
                type: 'time',
                label: 'Main Time',
                description: 'Main Time',
                optionList: [
                    HourMinuteSecond.ofMinutes(1),
                    HourMinuteSecond.ofMinutes(5),
                    HourMinuteSecond.ofMinutes(30),
                    HourMinuteSecond.ofMinutes(60),
                    HourMinuteSecond.ofMinutes(180),
                ],
            }),
            timePerPeriod: Datum.of(HourMinuteSecond.ofSeconds(30)).setMetadata({
                type: 'time',
                label: 'Time Per Period',
                description: 'Time Per Period',
                optionList: [
                    HourMinuteSecond.ofSeconds(20),
                    HourMinuteSecond.ofSeconds(30),
                    HourMinuteSecond.ofSeconds(40),
                    HourMinuteSecond.ofSeconds(60),
                ],
            }),
            periods: Datum.of(5).setMetadata({
                type: 'number',
                label: 'Periods',
                description: 'Periods',
                optionList: [
                    1, 3, 5, 10,
                ],
            }),
        })
    }

    public override getName(): string {
        return 'Byoyomi'
    }

    public override getDescription(): string {
        return 'Players begin with a main time allocation; once depleted, they enter periods of additional time, ' +
            'resetting each turn. Failure to make a move within a period consumes that time segment.'
    }
}

/**
 * Byoyomi board game player.
 */
export class ByoyomiPlayer extends Player {
}

/**
 * Byoyomi time control player settings.
 */
export interface ByoyomiPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
    timePerPeriod: HourMinuteSecond
    periods: number
}