import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgentManager, AgentPosition } from '../../logic/AgentManager';
import { RootState } from '../store';

export type AgentState = {
  // whether either of agent is running
  isClockRunning: boolean;

  // the current agent
  currentAgent: AgentPosition
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    isClockRunning: false,
    currentAgent: AgentPosition.A,
  },
  reducers: {
    clockRun: (state: AgentState, agentPosition: PayloadAction<AgentPosition>) => {
      AgentManager.getInstance().start(agentPosition.payload);
      state.isClockRunning = true;
    },
    switchAgent: (state: AgentState) => {
      const agentManager = AgentManager.getInstance();
      agentManager.switchAgent();
      state.currentAgent = agentManager.runningAgent;
    },
  },
});

export const { clockRun, switchAgent } = agentSlice.actions;

export const selectIsClockRunning = (state: RootState) => state.agentSlice.isClockRunning;
export const selectCurrentAgent = (state: RootState) => state.agentSlice.currentAgent;

export default agentSlice.reducer;