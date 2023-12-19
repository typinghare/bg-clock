import { Player } from './Player'

/**
 * Board game request.
 */
export abstract class BoardGameRequest {
}

/**
 * Player Tap Request.
 */
export class PlayerTapRequest extends BoardGameRequest {
    /**
     * Creates a player tap request.
     * @param player The player who taps.
     */
    public constructor(private readonly player: Player) {
        super()
    }

    /**
     * Returns the player who taps.
     */
    public getPlayer(): Player {
        return this.player
    }
}