import { GameEvent, GameEventData } from '@typinghare/game-core'
import { Role } from '../Player'

/**
 * Player tap event.
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