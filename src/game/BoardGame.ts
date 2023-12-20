import { TimeControl } from './TimeControl'
import { float, Game } from '@typinghare/game-core'
import { Player, Role } from './Player'
import { BoardGameState, NotStartedState } from './BoardGameState'
import { PlayerTapEvent } from './event/PlayerTapEvent'
import { PlayerTapRequest } from './BoardGameRequest'

/**
 * Board game.
 */
export class BoardGame {
    /**
     * Selected time control.
     * @private
     */
    protected timeControl: TimeControl

    /**
     * Mapping from roles to players.
     * @private
     */
    protected byRole: Map<Role, Player> = new Map()

    /**
     * Board game current state.
     * @private
     */
    protected state: BoardGameState = new NotStartedState()

    /**
     * Creates a board game.
     * @param timeControlList
     * @param roleList
     */
    public constructor(
        protected readonly timeControlList: TimeControl[],
        protected readonly roleList: Role[],
    ) {
        this.timeControl = timeControlList[0]
    }

    /**
     * Returns time control list.
     */
    public getTimeControlList(): TimeControl[] {
        return this.timeControlList
    }

    /**
     * Selects a time control.
     * @param timeControl The time control to select.
     */
    public selectTimeControl(timeControl: TimeControl): void {
        if (!this.timeControlList.includes(timeControl)) {
            throw new Error('Time control not in the list')
        }

        this.timeControl = timeControl

        // Reset
        this.byRole.clear()

        // Initialize players
        for (const role of this.roleList) {
            this.byRole.set(role, timeControl.createPlayer(role))
        }
    }

    /**
     * Returns the selected time control.
     */
    public getSelectedTimeControl(): TimeControl {
        return this.timeControl
    }

    /**
     * Starts the board game.
     */
    public start(): void {
        const game = new Game(function(deltaTime: float) {
            console.log(deltaTime)
        })

        const eventManager = game.getContext().eventManager
        eventManager.addHandler(PlayerTapEvent, (gameEvent) => {
            const role: Role = gameEvent.getValue('role')
            const player: Player | undefined = this.byRole.get(role)
            if (player) {
                this.state.handle(new PlayerTapRequest(player))
            }
        })
    }
}

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
}