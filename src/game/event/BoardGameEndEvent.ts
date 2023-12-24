import { GameEvent } from '@typinghare/game-core'
import { Role } from '../Player'

/**
 * Board game ends.
 */
export class BoardGameEndEvent extends GameEvent {
    public constructor(eventData: BoardGameEndEventData) {
        super(eventData)
    }
}

export interface BoardGameEndEventData {
    role: Role
}