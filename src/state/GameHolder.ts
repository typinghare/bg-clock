import { useState } from 'react'
import { InitializableHolder } from '@typinghare/holder'
import { GameHolder } from '@typinghare/board-game-clock-core'

const gameHolderHolder = InitializableHolder.of<GameHolder<any>>()

export function useGameHolder(): [() => GameHolder<any> | undefined, (gameHolder: GameHolder<any> | undefined) => void] {
    const [gameHolder, setGameHolder] = useState<GameHolder<any> | undefined>(gameHolderHolder.get())

    return [
        () => gameHolder, (gameHolder ?: GameHolder<any>): void => {
            gameHolderHolder.assign(gameHolder)
            setGameHolder(gameHolder)
        },
    ]
}