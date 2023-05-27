import { BoardGame } from '@typinghare/board-game-clock-core'

export class GameManager {
    private static readonly _INSTANCE: GameManager = new GameManager()

    private _game?: BoardGame<any, any>

    private _gameStarted: boolean = false

    static get INSTANCE(): GameManager {
        return GameManager._INSTANCE
    }

    set game(game: BoardGame<any, any>) {
        this.clearGame()

        this._game = game
    }

    get game(): BoardGame<any, any> {
        if (this._game === undefined) {
            throw new Error('Game has not been set.')
        }

        return this._game
    }

    startGame(): void {
        this.game.start()
        this._gameStarted = true
    }

    isGameStarted(): boolean {
        return this._gameStarted
    }

    /**
     * Clears current game.
     */
    clearGame(): void {
        if (this._game !== undefined) {
            try {
                this._game.stop()
            } catch (e) {
            }

            this._game = undefined
        }

        this._gameStarted = false
    }
}