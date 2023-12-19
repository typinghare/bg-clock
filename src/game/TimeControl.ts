import { Player, PlayerSettings, Role } from './Player'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Datum } from '@typinghare/extrum'

/**
 * Time control.
 */
export class TimeControl {
    /**
     * Creates a player.
     * @param role The role of the player to create.
     */
    public createPlayer(role: Role): Player<DefaultPlayerSettings> {
        return new Player<DefaultPlayerSettings>(role, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                label: 'Main Time',
            }),
        })
    }

    /**
     * The description of this time control.
     */
    public getDescription(): string {
        return 'A general time control.'
    }
}

/**
 * Default player settings.
 */
export interface DefaultPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
}