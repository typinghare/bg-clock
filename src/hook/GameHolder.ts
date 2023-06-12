import { InitializableHolder } from '@typinghare/holder'
import { GameHolder } from '@typinghare/board-game-clock-core'

const gameHolderHolder = InitializableHolder.of<GameHolder<any>>()

export function useGameHolder(): [() => GameHolder<any> | undefined, (gameHolder: GameHolder<any> | undefined) => void] {
    return [
        () => gameHolderHolder.get(),
        (gameHolder ?: GameHolder<any>): void => {
            gameHolderHolder.assign(gameHolder)
        },
    ]
}