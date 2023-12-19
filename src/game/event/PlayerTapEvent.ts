import { GameEvent, GameEventData } from '@typinghare/game-core'
import { Role } from '../Player'

/**
 * Player click event.
 */
export class PlayerTapEvent extends GameEvent<PlayerTapEventData> {
    public constructor(eventData?: PlayerTapEventData) {
        super({ role: eventData?.role || '' })
    }
}

/**
 * Player click event data.
 */
export interface PlayerTapEventData extends GameEventData {
    role: Role
}