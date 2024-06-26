import { BoardGame } from './BoardGame'
import { TimeControl } from './TimeControl'
import { Player, Role } from './Player'
import { NotStartedState, OngoingState } from './BoardGameState'
import { PlayerTapRequest } from './BoardGameRequest'

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

    protected override getNextRole(role: Role): Role {
        return role == TwoPlayerBoardGame.ROLE_A ?
            TwoPlayerBoardGame.ROLE_B :
            TwoPlayerBoardGame.ROLE_A
    }

    protected override onPlayerTap(role: Role) {
        super.onPlayerTap(role)

        const player: Player = this.getPlayer(role)
        const nextPlayer: Player = this.getPlayer(this.getNextRole(role))
        if (this.isState(OngoingState)) {
            if (!player.isPaused()) {
                player.pause()
                nextPlayer.resume()
            }
        } else if (this.isState(NotStartedState)) {
            nextPlayer.resume()
            this.handleRequest(new PlayerTapRequest())
        }
    }
}
