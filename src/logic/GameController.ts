import { Game } from './Game';
import { GoGame } from './game/go/GoGame';
import { Role } from './Role';

export type GameClass = new () => Game<any, any>;

/**
 * Game Controller.
 */
export class GameController {
    private static readonly _INSTANCE = new GameController();

    private _game?: Game<any, any>;

    private constructor() {
        this.bootGame(GoGame);
        console.log(this._game);
        this._game?.start((role: Role) => {

        });
    }

    /**
     * Returns the instance.
     */
    public static get INSTANCE(): GameController {
        return GameController._INSTANCE;
    }

    /**
     * Boots a game.
     * @param gameClass
     */
    public bootGame(gameClass: GameClass): void {
        this._game = new gameClass();
    }

    /**
     * Closes the current game.
     */
    public closeGame(): void {
        this._game?.close();
        this._game = undefined;
    }

    /**
     * Whether a game has booted.
     */
    public isGameBooted(): boolean {
        return this._game !== undefined;
    }

    /**
     * Returns the current game.
     */
    public getGame<G extends Game<any, any>>(): G {
        if (this._game === undefined) {
            throw new Error('The game has not been booted!');
        }

        return this._game as G;
    }
}