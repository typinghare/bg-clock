import { OptionContainer } from './OptionContainer';
import { Time } from '../common/Time';
import { Role } from './Role';
import { TimeControl } from './TimeControl';
import { Closable } from '../common/Closable';

export type PlayerOptions = {
    mainTime: Time;
    timePerPeriod: Time;
    periods: number;
}

export class Player<T extends PlayerOptions> extends OptionContainer<T> implements Closable {
    private readonly _role: Role;

    private _timeControl?: TimeControl;

    /**
     * Creates a player.
     * @param role
     */
    public constructor(role: Role) {
        super();
        this._role = role;
    }

    /**
     * Sets time control.
     * @param timeControl
     */
    public setTimeControl(timeControl: TimeControl): void {
        this._timeControl = timeControl;
    }

    /**
     * Returns time control.
     */
    public get timeControl(): TimeControl {
        if (this._timeControl === undefined) {
            throw new Error('You should not access time control before starting the game.');
        }

        return this._timeControl;
    }

    /**
     * @override
     */
    public close(): void {
        this._timeControl?.close();
    }
}