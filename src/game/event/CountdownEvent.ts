import { GameEvent, GameEventData } from '@typinghare/game-core'

/**
 * This event is triggered when the remaining time of the ongoing player changes in terms of seconds.
 */
export class CountdownEvent extends GameEvent {
    public constructor(eventData: Partial<CountDownEventData>) {
        super({ seconds: eventData.seconds })
    }
}

export interface CountDownEventData extends GameEventData {
    // The seconds remained
    seconds: number
}
