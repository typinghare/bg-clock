import { AgentManager, AgentPosition } from './AgentManager';
import { Agent } from './Agent';

export class Game {
  private readonly agentManager: AgentManager;

  /**
   * The agent that is currently running.
   * @private
   */
  private _runningAgent: AgentPosition = AgentPosition.A;

  /**
   * Creates a game.
   * @param agentManager
   */
  public constructor(agentManager: AgentManager) {
    this.agentManager = agentManager;
  }

  /**
   * Returns time up agent.
   */
  get timeUpAgent(): AgentPosition | undefined {
    if (this.agentManager.getAgent(AgentPosition.A)?.timer.isTimeUp) {
      return AgentPosition.A;
    } else if (this.agentManager.getAgent(AgentPosition.B)?.timer.isTimeUp) {
      return AgentPosition.B;
    }

    return undefined;
  }

  /**
   * Closes the game.
   */
  public close() {
    this.agentManager.getAgent(AgentPosition.A)?.close();
    this.agentManager.getAgent(AgentPosition.B)?.close();
  }

  /**
   * Starts from a specified agent.
   * @param agentPosition
   */
  public start(agentPosition: AgentPosition): void {
    const agent = this.agentManager.getAgent(agentPosition);
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
   * The position of running agent.
   */
  public runningAgent(): AgentPosition {
    return this._runningAgent;
  }

  /**
   * Switches an agent.
   */
  public switchAgent(): void {
    const agentA: Agent | undefined = this.agentManager.getAgent(AgentPosition.A);
    const agentB: Agent | undefined = this.agentManager.getAgent(AgentPosition.B);

    if (agentA === undefined || agentB === undefined) {
      return;
    }
    const isAgentARunning = this.isRunning(AgentPosition.A);
    const runningAgent = isAgentARunning ? agentA : agentB;
    const pausingAgent = isAgentARunning ? agentB : agentA;


    console.log('Now pausing agent: ' + (isAgentARunning ? 'A' : 'B') + '.');
    console.log('Now resuming agent: ' + (isAgentARunning ? 'B' : 'A') + '.');

    runningAgent.timer.pause();
    pausingAgent.timer.resume();

    this._runningAgent = isAgentARunning ? AgentPosition.B : AgentPosition.A;
  }
}