import { BoardGame } from '../game'
import { useState } from 'react'
import { Holder } from '@typinghare/holder'

/**
 * Board game holder.
 */
const boardGameHolder = Holder.of<BoardGame>()

/**
 * Uses the current board game.
 */
export function useBoardGame(): [BoardGame | undefined, BoardGameSetter] {
    const [, setGame] = useState<BoardGame>()
    return [
        boardGameHolder.get(),
        (boardGame ?: BoardGame): void => {
            setGame(boardGame)
            boardGameHolder.assign(boardGame)
        },
    ]
}

type BoardGameSetter = (game: BoardGame | undefined) => void