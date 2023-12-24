import { GameEvent, GameEventData } from '@typinghare/game-core'
import { Role } from '../Player'

export class PauseEvent extends GameEvent<GamePauseEventData> {
    public constructor(eventData: Partial<GamePauseEventData>) {
        super({ role: eventData.role })
    }
}

export interface GamePauseEventData extends GameEventData {
    role: Role
}