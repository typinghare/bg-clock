import { BoardGameRequest, PlayerTapRequest } from './BoardGameRequest'

/**
 * Board game state.
 */
export interface BoardGameState {
    /**
     * Handles a board game request.
     * @param request The request to handle.
     * @return the new state.
     */
    handle(request: BoardGameRequest): BoardGameState
}

/**
 * Not started state.
 */
export class NotStartedState implements BoardGameState {
    handle(request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerTapRequest) {
            return new OngoingState()
        }

        return this
    }
}

/**
 * Ongoing state.
 */
export class OngoingState implements BoardGameState {
    handle(request: BoardGameRequest): BoardGameState {
        throw new Error('Method not implemented.')
    }
}

/**
 * Paused state.
 */
export class PausedState implements BoardGameState {
    handle(request: BoardGameRequest): BoardGameState {
        throw new Error('Method not implemented.')
    }
}

/**
 * Ended state.
 */
export class EndedState implements BoardGameState {
    handle(request: BoardGameRequest): BoardGameState {
        throw new Error('Method not implemented.')
    }
}