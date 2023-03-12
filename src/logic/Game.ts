import { BasicOptions, OptionContainer } from './OptionContainer';
import { Player, PlayerOptions } from './Player';
import { Role } from './Role';
import { Closable } from '../common/Closable';

export type GameOptions = BasicOptions & {}

export type GameEndCallback = (role: Role) => void;

/**
 * @abstract
 * @generic <G> game options
 * @generic <P> player options
 */
export abstract class Game<G extends GameOptions = GameOptions, P extends PlayerOptions = PlayerOptions> extends OptionContainer<G> implements Closable {
    private readonly _playerA: Player<P>;
    private readonly _playerB: Player<P>;

    private _hasStarted: boolean = false;

    /**
     * Creates a game.
     */
    public constructor() {
        super();
        this._playerA = new Player<P>(Role.A);
        this._playerB = new Player<P>(Role.B);

        this.init();
    }

    /**
     * Whether this game has started.
     */
    get hasStarted(): boolean {
        return this._hasStarted;
    }

    /**
     * Returns the player of a specified role
     * @param role
     */
    public getPlayer(role: Role): Player<P> {
        return role === Role.A ? this._playerA : this._playerB;
    }

    /**
     * Starts this game.
     * @param gameEndCallback
     */
    public start(gameEndCallback: GameEndCallback): void {
        this.starts(gameEndCallback);
        this._hasStarted = true;
    }

    /**
     * Initializes this game. Implementations should initialize the default settings for players.
     */
    public abstract init(): void;

    /**
     * Starts this game. Implementations should create time controls for both players.
     * @abstract
     */
    protected abstract starts(gameEndCallback: GameEndCallback): void;

    /**
     * Players click their sections.
     * @param role the role of the player
     * @abstract
     */
    public abstract playerClick(role: Role): void;

    /**
     * @override
     */
    public close(): void {
        this._playerA.close();
        this._playerB.close();
    }
}