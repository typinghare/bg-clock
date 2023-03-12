import { Closable } from '../common/Closable';
import { Timer } from './Timer';
import { Time } from '../common/Time';

export type TimerEndCallback = (timeControl: TimeControl) => void;

export type TimeControlSettings = {
    // the main time
    mainTime: Time,

    // the time of each period
    timePerPeriod: Time,

    // the number of periods
    periods: number

    // callback of timer end
    timerEndCallback: TimerEndCallback
}

export abstract class TimeControl implements Closable {
    /**
     * Time control settings.
     * @private
     */
    private readonly _settings: TimeControlSettings;

    /**
     * Timer.
     * @private
     */
    private _timer: Timer;

    /**
     * The number of periods left.
     * @private
     */
    private _periodsLeft: number;

    /**
     * Whether this time control has ended.
     * @private
     */
    private _isEnd: boolean = false;

    /**
     * Creates a time control.
     * @param settings
     */
    protected constructor(settings: TimeControlSettings) {
        this._settings = settings;
        this._timer = this.initTimer();
        this._periodsLeft = settings.periods;
    }

    /**
     * Returns time control settings.
     * @protected
     */
    protected get settings(): TimeControlSettings {
        return this._settings;
    }

    /**
     * Returns periods left.
     */
    public getPeriodsLeft(): number {
        return this._periodsLeft;
    }

    /**
     * Whether this time control ends.
     */
    public isEnd(): boolean {
        return this._isEnd;
    }

    /**
     * Sets periods left.
     * @param periodsLeft
     */
    public setPeriodsLeft(periodsLeft: number): void {
        this._periodsLeft = periodsLeft;
    }

    /**
     * Resumes the timer.
     */
    public resumeTimer(): void {
        const time: Time | undefined = this.beforeResume();
        if (time !== undefined) this._timer.setTime(time);

        this._timer.resume();
    }

    /**
     * Pauses the timer.
     */
    public pauseTimer(): void {
        this._timer.pause();
    }

    /**
     * When the timer ends, this function will be invoked.
     */
    public timerEnd(): void {
        this._isEnd = true;
        this._settings.timerEndCallback(this);
    }

    /**
     * Whether the timer is running.
     */
    public isTimerRunning(): boolean {
        return this._timer.isRunning();
    }

    /**
     * Returns the time.
     */
    public getTime(): Time {
        return this._timer.time.clone() || Time.zero();
    }

    /**
     * Initializes a timer.
     * @abstract
     */
    public abstract initTimer(): Timer;

    /**
     * @abstract
     */
    public abstract beforeResume(): Time | undefined;

    /**
     * Closes this time control.
     * @override
     */
    close(): void {
        this._timer.close();
    }
}