import { BoardGame } from './BoardGame'
import { TimeControl } from './TimeControl'
import { Role } from './Player'

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
}
