import {
    BoardGameRequest,
    PlayerPauseRequest,
    PlayerResumeRequest,
    PlayerRunOutTimeRequest,
    PlayerTapRequest,
} from './BoardGameRequest'
import { BoardGame } from './BoardGame'

/**
 * Board game state.
 */
export abstract class BoardGameState {
    /**
     * Handles a board game request.
     * @param boardGame
     * @param request The request to handle.
     * @return the new state.
     */
    public abstract handle(boardGame: BoardGame, request: BoardGameRequest): BoardGameState
}

/**
 * Not started state.
 */
export class NotStartedState extends BoardGameState {
    public handle(_: BoardGame, request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerTapRequest) {
            return new OngoingState()
        }

        return this
    }
}

/**
 * Ongoing state.
 */
export class OngoingState extends BoardGameState {
    public handle(boardGame: BoardGame, request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerPauseRequest) {
            boardGame.pause()
            return new PausedState()
        } else if (request instanceof PlayerRunOutTimeRequest) {
            return new EndedState()
        }

        return this
    }
}

/**
 * Paused state.
 */
export class PausedState extends BoardGameState {
    public handle(boardGame: BoardGame, request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerResumeRequest) {
            boardGame.resume()
            return new OngoingState()
        } else if (request instanceof PlayerTapRequest) {
            return new OngoingState()
        }

        return this
    }
}

/**
 * Ended state.
 */
export class EndedState extends BoardGameState {
    public override handle(): BoardGameState {
        return this
    }
}
