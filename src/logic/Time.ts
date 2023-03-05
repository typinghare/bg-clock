export namespace Time {
  // types
  export type Hour = number
  export type Minute = number
  export type Second = number

  // constants
  export const MS_IN_SECOND: number = 1000;
  export const SECOND_IN_MINUTE: number = 60;
  export const MS_IN_MINUTE: number = MS_IN_SECOND * SECOND_IN_MINUTE;
  export const MINUTE_IN_HOUR: number = 60;
  export const MS_IN_HOUR: number = MS_IN_MINUTE * MINUTE_IN_HOUR;

  /**
   * Returns current timestamp.
   */
  export const time = function(): number {
    return new Date().getTime();
  };

  /**
   * Time symbol.
   */
  export class Symbol {
    /**
     * Milliseconds of this symbol.
     * @private
     */
    private _ms: number;

    public constructor(ms: number) {
      this._ms = ms;
    }

    public get ms() {
      return this._ms;
    }

    /**
     * Returns the hours left.
     */
    public get hour(): number {
      return Math.floor(this._ms / MS_IN_HOUR);
    }

    /**
     * Returns the minutes left.
     */
    public get minute(): number {
      return Math.floor(this._ms / MS_IN_MINUTE) % MINUTE_IN_HOUR;
    }

    /**
     * Returns the seconds left.
     */
    public get second() {
      return Math.floor(this._ms / MS_IN_SECOND) % SECOND_IN_MINUTE;
    }

    /**
     * Consumes (minus) a specified time.
     * @param ms
     */
    public consume(ms: number): void {
      this._ms = Math.max(this._ms - ms, 0);
    }
  }

  /**
   * Creates a time symbol by hour, minute, and second given.
   * @param hour
   * @param minute
   * @param second
   */
  export const create = (hour: Hour, minute: Minute, second: Second): Time.Symbol => {
    return new Time.Symbol(hour * MS_IN_HOUR + minute * MS_IN_MINUTE + second * MS_IN_SECOND);
  };

  /**
   * Creates a time symbol that holds 0 milliseconds.
   */
  export const creatZero = () => {
    return new Time.Symbol(0);
  };

  /**
   * Clones and returns a time symbol.
   * @param symbol
   */
  export const copy = function(symbol: Time.Symbol): Time.Symbol {
    return new Symbol(symbol.ms);
  };

  export const isTheSame = function(symbol1: Time.Symbol, symbol2: Time.Symbol): boolean {
    return (symbol1.ms - symbol2.ms) < 1000 && symbol1.second === symbol2.second;
  };
}