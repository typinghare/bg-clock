import { BoardGame } from '../game'
import { Holder } from '@typinghare/holder'

/**
 * Board game holder.
 */
const boardGameHolder = Holder.of<BoardGame>()

/**
 * Uses the current board game.
 */
export function useBoardGame(): [BoardGame | undefined, BoardGameSetter] {
    return [
        boardGameHolder.get(),
        (boardGame ?: BoardGame): void => {
            boardGameHolder.assign(boardGame)
        },
    ]
}

type BoardGameSetter = (game: BoardGame | undefined) => void