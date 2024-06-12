import { GameEvent, GameEventData } from '@typinghare/game-core'
import { Role } from '../Player'

/**
 * This even is triggered when one player taps their section. The role of the player should be
 * provided to trigger this event.
 */
export class PlayerTapEvent extends GameEvent<PlayerTapEventData> {
    public constructor(eventData: Partial<PlayerTapEventData>) {
        super({ role: eventData.role })
    }
}

/**
 * Player tap event data.
 */
export interface PlayerTapEventData extends GameEventData {
    role: Role
}
