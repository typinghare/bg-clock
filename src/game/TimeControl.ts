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
        return new DefaultPlayer(role)
    }

    /**
     * Returns the name of the time control.
     */
    public getName(): string {
        return 'General'
    }

    /**
     * The description of this time control.
     */
    public getDescription(): string {
        return 'The game concludes when the main time expires, resulting in a loss for the player.'
    }
}

/**
 * Default player.
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings> {
    public constructor(role: Role) {
        super(role, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                type: 'time',
                label: 'Main Time',
                description: '',
            }),
        })
    }

    public override getReady() {
        this.setTime(this.getValue('mainTime'))
    }
}

/**
 * Default player settings.
 */
export interface DefaultPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
}
