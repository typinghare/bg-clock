import { TimeControl } from './TimeControl';
import { Timer } from './Timer';


/**
 * Agent in the board game.
 */
export class Agent {
  /**
   * The time control applied to this agent.
   * @private
   */
  private readonly _timeControl: TimeControl;

  /**
   * The timer to this agent.
   * @private
   */
  private readonly _timer: Timer;

  /**
   * Creates an agent.
   * @param timeControl
   */
  public constructor(timeControl: TimeControl) {
    this._timeControl = timeControl;
    this._timer = new Timer(timeControl);
  }

  /**
   * Returns the time control applied to this agent.
   */
  public get timeControl(): TimeControl {
    return this._timeControl;
  }

  /**
   * Returns the timer.
   */
  public get timer(): Timer {
    return this._timer;
  }
}