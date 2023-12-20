import { BoardGame } from './BoardGame'
import { GoGame } from './categories/go'

export class BoardGames {
    /**
     * Singleton instance.
     * @private
     */
    private static readonly Instance: BoardGames = new BoardGames()

    /**
     * Board game map.
     * @private
     */
    private readonly boardGameMap: Map<BoardGameType, BoardGameClass> = new Map()

    /**
     * Private constructor.
     * @private
     */
    private constructor() {
        this.boardGameMap.set(BoardGameType.Go, GoGame)
    }

    /**
     * Gets a board game instance by a specific board game type.
     * @param boardGameType The specific type of board game.
     */
    public static get(boardGameType: BoardGameType): BoardGame {
        const boardGameClass = BoardGames.Instance.boardGameMap.get(boardGameType)
        if (boardGameClass === undefined) {
            throw new InvalidBoardGameTypeException(boardGameType)
        }

        return new boardGameClass()
    }
}

/**
 * Board game type.
 */
export enum BoardGameType {
    Go = 0,
    Chess = 1
}

/**
 * Invalid board game type exception.
 */
export class InvalidBoardGameTypeException extends Error {
    public constructor(boardGameType: number) {
        super(`Invalid board game time: ${boardGameType}`)
    }
}

type BoardGameClass = new () => BoardGame