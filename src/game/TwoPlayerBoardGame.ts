import { BoardGame } from './BoardGame'
import { TimeControl } from './TimeControl'
import { Player, Role } from './Player'
import { OngoingState } from './BoardGameState'

/**
 * Board game that includes two players.
 */
export class TwoPlayerBoardGame extends BoardGame {
    public static readonly ROLE_A = 'A'
    public static readonly ROLE_B = 'B'

    /**
     * Creates a two-player board game.
     * @param timeControlList
     */
    public constructor(
        protected readonly timeControlList: TimeControl[],
    ) {
        super(timeControlList, [TwoPlayerBoardGame.ROLE_A, TwoPlayerBoardGame.ROLE_B])
    }

    protected override onPlayerTap(role: Role) {
        super.onPlayerTap(role)

        // Resume the next player
        if (this.state instanceof OngoingState) {
            const nextPlayer: Player = this.getPlayer(this.getNextRole(role))
            nextPlayer.resume()
        }
    }
}
