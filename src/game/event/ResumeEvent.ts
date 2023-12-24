import { GameEvent, GameEventData } from '@typinghare/game-core'
import { Role } from '../Player'

/**
 * Game resume event.
 */
export class ResumeEvent extends GameEvent<GameResumeEventData> {
    public constructor(eventData: Partial<GameResumeEventData>) {
        super({ role: eventData.role })
    }
}

/**
 * Game resume event data.
 */
export interface GameResumeEventData extends GameEventData {
    role: Role
}