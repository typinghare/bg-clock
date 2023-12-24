import { Player, PlayerSettings, Role } from './Player'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Datum } from '@typinghare/extrum'
import { BoardGame } from './BoardGame'

/**
 * Time control.
 */
export class TimeControl {
    /**
     * Creates a player.
     * @param role The role of the player to create.
     * @param boardGame The board game creating the player
     */
    public createPlayer(role: Role, boardGame: BoardGame): Player<DefaultPlayerSettings> {
        return new DefaultPlayer(role, boardGame)
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
    public constructor(role: Role, boardGame: BoardGame) {
        super(role, boardGame, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                type: 'time',
                label: 'Main Time',
                description: '',
            }),
        }, {})
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
