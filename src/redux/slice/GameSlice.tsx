import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgentManager, AgentPosition } from '../../logic/AgentManager';
import { RootState } from '../store';
import { Game } from '../../logic/Game';

export type AgentState = {
  // whether either of agent is running
  isClockRunning: boolean;

  // the current agent (string)
  currentAgent: string,

  // time up agent
  timeUpAgent?: string
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isClockRunning: false,
    currentAgent: AgentPosition.A.toString(),
    timeUpAgent: undefined
  },
  reducers: {
    clockRun: (state: AgentState, agentPosition: PayloadAction<string>) => {
      const game: Game = AgentManager.getInstance().startGame();
      game.start(AgentPosition.parse(agentPosition.payload));

      state.isClockRunning = true;
    },
    switchAgent: (state: AgentState) => {
      const agentManager = AgentManager.getInstance();
      agentManager.game?.switchAgent();
      if (agentManager.game) {
        state.currentAgent = agentManager.game.runningAgent().toString();
      }
    },
  },
});

export const { clockRun, switchAgent } = gameSlice.actions;

export const selectIsClockRunning = (state: RootState) => state.gameSlice.isClockRunning;
export const selectCurrentAgent = (state: RootState) => state.gameSlice.currentAgent;

export default gameSlice.reducer;