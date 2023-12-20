import './App.css'
import React, { createContext } from 'react'
import { GameSelectionPage, PortalPage } from '../Page'
import { GameSettingsPage } from '../Page/GameSettingsPage'
import { ClockPage } from '../Page/ClockPage'
import { Game } from '@typinghare/game-core'

export const GameContext = createContext<Game | undefined>(undefined)

export function App() {
    return (
        <GameContext.Provider value={undefined}>
            <PortalPage />
            <GameSelectionPage />
            <GameSettingsPage />
            <ClockPage />
        </GameContext.Provider>
    )
}