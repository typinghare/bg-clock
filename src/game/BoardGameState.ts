import {
    BoardGameRequest,
    PlayerPauseRequest,
    PlayerResumeRequest,
    PlayerRunOutTimeRequest,
    PlayerTapRequest,
} from './BoardGameRequest'

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
    public handle(request: BoardGameRequest): BoardGameState {
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
    public handle(request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerPauseRequest) {
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
export class PausedState implements BoardGameState {
    public handle(request: BoardGameRequest): BoardGameState {
        if (request instanceof PlayerResumeRequest) {
            return new OngoingState()
        }

        return this
    }
}

/**
 * Ended state.
 */
export class EndedState implements BoardGameState {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle(_: BoardGameRequest): BoardGameState {
        return this
    }
}