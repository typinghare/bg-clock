import { BoardGame } from './BoardGame'
import { GoGame } from './categories/go'
import { ChessGame } from './categories/chess'

/**
 * Singleton board game collection.
 */
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
        this.boardGameMap.set(BoardGameType.Chess, ChessGame)
    }

    /**
     * Gets a board game instance by a specific board game type.
     * @param boardGameType The specific type of board game.
     */
    public static get(boardGameType: BoardGameType): BoardGame {
        const boardGameClass = this.Instance.boardGameMap.get(boardGameType)
        if (boardGameClass === undefined) {
            throw new InvalidBoardGameTypeException(boardGameType)
        }

        return new boardGameClass()
    }

    public static getBoardGameType(boardGame: BoardGame): BoardGameType {
        for (const [boardGameType, boardGameClass] of this.Instance.boardGameMap.entries()) {
            if (boardGame instanceof boardGameClass) {
                return boardGameType
            }
        }

        return BoardGameType.UNKNOWN
    }
}

/**
 * Board game type.
 */
export enum BoardGameType {
    UNKNOWN = 0,
    Go = 1,
    Chess = 2
}

/**
 * Invalid board game type exception.
 */
export class InvalidBoardGameTypeException extends Error {
    public constructor(boardGameType: number) {
        super(`Invalid board game time: ${boardGameType}`)
    }
}

export type BoardGameClass = new () => BoardGame
