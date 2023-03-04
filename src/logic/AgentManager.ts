import { Agent } from './Agent';
import { Time } from './Time';
import { TimeControl } from './TimeControl';

/**
 * The position of agents. Currently only support two agents in a game.
 */
export enum AgentPosition {
  A, B
}

/**
 * Agent manager.
 */
export class AgentManager {
  private static INSTANCE: AgentManager;

  private _agentA?: Agent = undefined;

  private _agentB?: Agent = undefined;

  private _runningAgent: AgentPosition = AgentPosition.A;

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
   * Returns the agent that is running.
   */
  get runningAgent(): AgentPosition {
    return this._runningAgent;
  }

  public setAgent(agentPosition: AgentPosition, agent: Agent) {
    if (agentPosition === AgentPosition.A) {
      this._agentA = agent;
    } else if (agentPosition === AgentPosition.B) {
      this._agentB = agent;
    }
  }

  /**
   * Returns an agent by its position.
   * @param agentPosition
   */
  public getAgent(agentPosition: AgentPosition): Agent | undefined {
    return agentPosition === AgentPosition.A ? this._agentA : this._agentB;
  }

  /**
   * Starts from a specified agent.
   * @param agentPosition
   */
  public start(agentPosition: AgentPosition): void {
    const agent = this.getAgent(agentPosition);
    if (agent !== undefined) {
      agent.timer.resume();
    }
  }

  /**
   * Whether a specified agent is running.
   * @param agentPosition
   */
  public isRunning(agentPosition: AgentPosition): boolean {
    return this._runningAgent === agentPosition;
  }

  /**
   * Switches an agent.
   */
  public switchAgent(): void {
    const isAgentARunning = this.isRunning(AgentPosition.A);
    const runningAgent = isAgentARunning ? this._agentA : this._agentB;
    const pausingAgent = isAgentARunning ? this._agentB : this._agentA;

    if (runningAgent === undefined || pausingAgent === undefined) {
      return;
    }

    console.log('Now pausing: ' + (isAgentARunning ? 'A' : 'B'));
    console.log('Now resuming: ' + (isAgentARunning ? 'B' : 'A'));
    runningAgent.timer.pause();
    pausingAgent.timer.resume();

    this._runningAgent = isAgentARunning ? AgentPosition.B : AgentPosition.A;
  }
}