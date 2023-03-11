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
     * Returns the player of a specified role
     * @param role
     */
    public getPlayer(role: Role): Player<P> {
        return role === Role.A ? this._playerA : this._playerB;
    }

    /**
     * Initializes this game. Implementations should initialize the default settings for players.
     */
    public abstract init(): void;

    /**
     * Starts this game. Implementations should create time controls for both players.
     * @abstract
     */
    public abstract start(gameEndCallback: GameEndCallback): void;

    /**
     * @override
     */
    public close(): void {
        this._playerA.close();
    }
}