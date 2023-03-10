import { Time } from './Time';
import { timestamp } from '../common/helper';

export type TimeoutCallback = () => Time | undefined;

export type TimerSettings = {
    time: Time
    timeoutTolerance?: Time
    timeoutCallback?: TimeoutCallback
}

/**
 * Timer.
 */
export class Timer {
    private static readonly DEFAULT_TIMEOUT_TOLERANCE = Time.createZero();

    /**
     * Time settings.
     * @private
     */
    private readonly _timeSettings: TimerSettings;

    /**
     * Time.
     * @private
     */
    private _time: Time;

    private _intervalId?: NodeJS.Timer;

    private _timeoutId?: NodeJS.Timeout;

    private _lastTimeStamp?: number;

    /**
     * Creates a timer.
     * @param timerSettings
     */
    public constructor(timerSettings: TimerSettings) {
        this._timeSettings = timerSettings;
        this._time = timerSettings.time.clone();
    }

    /**
     * Returns the time of this timer.
     */
    get time(): Time {
        return this._time;
    }

    /**
     * Starts or resumes this timer.
     */
    public resume(): void {
        this._intervalId = setInterval(() => {
            this._time.consume(Time.SECOND);
            this._lastTimeStamp = timestamp();
        }, Time.SECOND);

        const tolerance: Time = this._timeSettings.timeoutTolerance || Timer.DEFAULT_TIMEOUT_TOLERANCE;
        this._timeoutId = setTimeout(() => {
            // clear interval and timeout
            this._lastTimeStamp = undefined;
            this.pause();

            // invoke timeout callback function
            const timeoutCallback = this._timeSettings.timeoutCallback;
            if (timeoutCallback) {
                const newTime: Time | undefined = timeoutCallback();
                if (newTime !== undefined) {
                    this._time = newTime.clone();
                    this.resume();
                }
            }
        }, tolerance.ms);
    }

    /**
     * Pauses this timer.
     */
    public pause(): void {
        this._intervalId && clearInterval(this._intervalId);
        this._intervalId = undefined;

        this._timeoutId && clearTimeout(this._timeoutId);
        this._timeoutId = undefined;

        // consumes excessive time
        if (this._lastTimeStamp !== undefined) {
            this._time.consume(timestamp() - this._lastTimeStamp);
        }
    }

    /**
     * Whether is timer is running.
     * @return true if the timer is running; false otherwise.
     */
    public isRunning(): boolean {
        return this._intervalId !== undefined;
    }
}