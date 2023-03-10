import { TimeControl } from './TimeControl';
import { Time } from './Time';

export class Timer {
    /**
     * Time control.
     * @private
     */
    private readonly timeControl: TimeControl;

    /**
     * The number of periods left.
     * @private
     */
    private _periodNumberLeft: number;

    /**
     * Current time.
     * @private
     */
    private _time: Time.Symbol;

    /**
     * The timestamp of last set time.
     * @private
     */
    private lastSetTimestamp?: number;

    /**
     * Interval id.
     * @private
     */
    private intervalId?: NodeJS.Timer;

    /**
     * Timeout id.
     * @private
     */
    private timeOutId?: NodeJS.Timeout;

    /**
     * Whether this timer has time up.
     * @private
     */
    private _isTimeUp: boolean = false;

    /**
     * Creates a timer.
     * @param timeControl
     */
    public constructor(timeControl: TimeControl) {
        this.timeControl = timeControl;
        this._time = Time.copy(timeControl.main);
        this._periodNumberLeft = timeControl.periodNumber;
    }

    get isTimeUp(): boolean {
        return this._isTimeUp;
    }

    get periodNumberLeft(): number {
        return this._periodNumberLeft;
    }

    get time(): Time.Symbol {
        return this._time;
    }

    /**
     * Resumes this timer.
     */
    public resume(): void {
        if (this.isRunning()) return;

        this.lastSetTimestamp = Time.time();
        this.intervalId = setInterval(() => {
            this._time.consume(Time.MS_IN_SECOND);
            this.lastSetTimestamp = Time.time();
        }, Time.MS_IN_SECOND);

        // time up clockPanel
        this.timeOutId = setTimeout(() => {
            this.lastSetTimestamp = undefined;
            this.pause();

            // if there is no time periods left
            if (this._periodNumberLeft <= 1) {
                this.timeUp();
                return;
            }

            // if there is time periods left, then consume one
            this._periodNumberLeft--;
            this._time = Time.copy(this.timeControl.period);
            this.resume();
        }, this._time.ms + 1000);
    }

    /**
     * Pauses this timer. This method will clear all timeout and interval and thus
     * the instance is safe to free.
     */
    public pause(): void {
        if (!this.isRunning()) return;

        // stop interval
        this.intervalId && clearInterval(this.intervalId);
        this.intervalId = undefined;

        // clear time up
        this.timeOutId && clearTimeout(this.timeOutId);
        this.timeOutId = undefined;

        // consumes excessive time
        if (this.lastSetTimestamp !== undefined) {
            const excessiveTime: number = Time.time() - this.lastSetTimestamp;
            this._time.consume(excessiveTime);
        }
    }

    /**
     * Whether this timer is running.
     * @return true if this timer is running; false if this timer paused
     */
    public isRunning(): boolean {
        return this.intervalId !== undefined;
    }

    /**
     * This timer stops due to time up.
     */
    private timeUp(): void {
        this.pause();

        this._time = Time.creatZero();
        this._isTimeUp = true;

        console.log('Time up!');
    }
}