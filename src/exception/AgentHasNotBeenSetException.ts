import { AgentPosition } from '../logic/AgentManager';

export class AgentHasNotBeenSetException extends Error {
    public constructor(agentPosition: AgentPosition) {
        super('' + agentPosition.toString());
    }
}