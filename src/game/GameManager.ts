import { AnyGame } from '@typinghare/board-game-clock-core'

export class GameHolder {
    private static _game: AnyGame

    static setGame(game: AnyGame): void {
        GameHolder._game = game
    }

    static getGame(): AnyGame {
        return GameHolder._game
    }

    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }
}