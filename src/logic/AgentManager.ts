import { Agent } from './Agent';
import { Time } from './Time';
import { TimeControl } from './TimeControl';
import { Game } from './Game';
import { AgentHasNotBeenSetException } from '../exception/AgentHasNotBeenSetException';

/**
 * The position of agents. Currently only support two agents in a game.
 */
export class AgentPosition {
  public static readonly A: AgentPosition = new AgentPosition('A');
  public static readonly B: AgentPosition = new AgentPosition('B');

  public static parse(agentPositionString: string): AgentPosition {
    if (agentPositionString === 'A') {
      return AgentPosition.A;
    } else if (agentPositionString === 'B') {
      return AgentPosition.B;
    }

    throw new Error('Unknown agent position string: ' + agentPositionString);
  }

  private readonly _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  public toString(): string {
    return this._name;
  }
}

/**
 * Agent manager.
 */
export class AgentManager {
  private static INSTANCE: AgentManager;

  private _agentA?: Agent = undefined;

  private _agentB?: Agent = undefined;

  private _game?: Game = undefined;

  private constructor() {
  }

  public static getInstance() {
    if (AgentManager.INSTANCE === undefined) {
      AgentManager.INSTANCE = new AgentManager();

      const main: Time.Symbol = Time.create(0, 0, 10);
      const period: Time.Symbol = Time.create(0, 0, 5);
      const periodNumber: number = 5;

      const timeControl = new TimeControl(main, period, periodNumber);
      AgentManager.INSTANCE.setAgent(AgentPosition.A, new Agent(timeControl));
      AgentManager.INSTANCE.setAgent(AgentPosition.B, new Agent(timeControl));
    }

    return AgentManager.INSTANCE;
  }

  /**
   * Returns the game.
   */
  get game(): Game | undefined {
    return this._game;
  }

  /**
   * Sets an agent.
   * @param agentPosition
   * @param agent
   */
  public setAgent(agentPosition: AgentPosition, agent: Agent) {
    if (agentPosition === AgentPosition.A) {
      this._agentA = agent;
    } else if (agentPosition === AgentPosition.B) {
      this._agentB = agent;
    }
  }

  /**
   * Starts a game. This method will stop and remove the ongoing game.
   */
  public startGame(): Game {
    if (this._agentA === undefined) {
      throw new AgentHasNotBeenSetException(AgentPosition.A);
    } else if (this._agentB === undefined) {
      throw new AgentHasNotBeenSetException(AgentPosition.B);
    }

    this._game = new Game(this);
    return this._game;
  }

  /**
   * Returns an agent by its position.
   * @param agentPosition
   */
  public getAgent(agentPosition: AgentPosition): Agent | undefined {
    return agentPosition === AgentPosition.A ? this._agentA : this._agentB;
  }
}