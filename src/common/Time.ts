/**
 * Time.
 */
export class Time {
    public static readonly SECOND_IN_MINUTE = 60;
    public static readonly MINUTE_IN_HOUR = 60;

    public static readonly SECOND: number = 1000;
    public static readonly MINUTE: number = Time.SECOND * Time.SECOND_IN_MINUTE;
    public static readonly HOUR: number = Time.MINUTE * Time.MINUTE_IN_HOUR;

    /**
     * Creates a time by hour, minute and second given.
     */
    public static create(hour: number, minute: number, second: number): Time {
        return new Time(hour * this.HOUR + minute * this.MINUTE + second + this.SECOND);
    }

    /**
     * Creates a time holds zero milliseconds.
     */
    public static zero(): Time {
        return new Time(0);
    }

    /**
     * Creates a time by specified seconds.
     * @param second
     */
    public static second(second: number): Time {
        return new Time(second * Time.SECOND);
    }

    /**
     * Creates a time by specified minutes.
     * @param minute
     */
    public static minute(minute: number): Time {
        return new Time(minute * Time.MINUTE);
    }

    /**
     * Time in milliseconds of this time.
     * @private
     */
    private _ms: number;

    /**
     * Creates a time.
     * @param ms
     */
    public constructor(ms: number) {
        this._ms = ms;
    }

    /**
     * Returns the time in milliseconds of this time.
     */
    public get ms(): number {
        return this._ms;
    }

    /**
     * Returns the hour of this time.
     */
    public get hour(): number {
        return Math.floor(this._ms / Time.HOUR);
    }

    /**
     * Returns the minute of this time.
     */
    public get minute(): number {
        return Math.floor(this._ms / Time.MINUTE) % Time.MINUTE_IN_HOUR;
    }

    /**
     * Returns the second of this time.
     */
    public get second(): number {
        return Math.floor(this._ms / Time.SECOND) % Time.SECOND_IN_MINUTE;
    }

    /**
     * Consumes specified time.
     * @param ms time in milliseconds to consume
     */
    public consume(ms: number): void {
        this._ms = Math.max(this._ms - ms, 0);
    }

    /**
     * Returns an identical time instance.
     */
    public clone(): Time {
        return new Time(this._ms);
    }

    /**
     * Whether this time is equal to the time given.
     * @param time the time to compare with this time
     */
    public equal(time: Time): boolean {
        return (this._ms - time._ms) < 1000 && this.second === time.second;
    }
}