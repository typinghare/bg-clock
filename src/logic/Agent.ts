import { TimeControl } from './TimeControl';
import { Timer } from './Timer';


/**
 * Agent in the board game.
 */
export class Agent {
  /**
   * The time policy applied to this agent.
   * @private
   */
  private readonly _timePolicy: TimeControl;

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
    this._timePolicy = timeControl;
    this._timer = new Timer(timeControl);
  }

  /**
   * Returns the time policy applied to this agent.
   */
  public get timePolicy(): TimeControl {
    return this._timePolicy;
  }

  /**
   * Returns the timer.
   */
  public get timer(): Timer {
    return this._timer;
  }
}