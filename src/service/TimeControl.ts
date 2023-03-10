import { Timer } from './Timer';

export type TimeControlSettings = {}

export abstract class AbstractTimeControl {
    private readonly _settings: TimeControlSettings;

    private _timer?: Timer;

    /**
     * Creates a time control.
     * @param settings
     */
    protected constructor(settings: TimeControlSettings) {
        this._settings = settings;
    }

    /**
     * Returns settings.
     * @protected
     */
    protected get settings() {
        return this._settings;
    }

    /**
     * Sets a timer.
     * @param timer
     * @protected
     */
    protected setTimer(timer: Timer): void {
        this._timer = timer;
    }

    /**
     * Initializes a timer.
     */
    public abstract initTimer(): void;
}