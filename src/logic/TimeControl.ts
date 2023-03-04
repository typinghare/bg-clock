import { Time } from './Time';


export class TimeControl {
  /**
   * Default time control.
   */
  public static defaultTimeControl: TimeControl
    = new TimeControl(Time.create(0, 0, 0), Time.create(0, 0, 30), 5);

  /**
   * @chinese 主时间
   * @private
   */
  private readonly _main: Time.Symbol;

  /**
   * @chinese 读秒时间
   * @japanese 秒読みな時間
   * @private
   */
  private readonly _period: Time.Symbol;

  /**
   * @chinese 保留时间次数
   * @private
   */
  private readonly _periodNumber: number;

  /**
   * Creates a time control.
   * @param main
   * @param timePeriod
   * @param timePeriodNumber
   */
  constructor(main: Time.Symbol, timePeriod: Time.Symbol, timePeriodNumber: number) {
    this._main = main;
    this._period = timePeriod;
    this._periodNumber = timePeriodNumber;
  }

  get main(): Time.Symbol {
    return this._main;
  }

  get period(): Time.Symbol {
    return this._period;
  }

  get periodNumber(): number {
    return this._periodNumber;
  }
}