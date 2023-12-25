import './App.css'
import React from 'react'
import { GameSelectionPage, PortalPage } from '../Page'
import { GameSettingsPage } from '../GameSettingsPage'
import { ClockPage } from '../ClockPage'
import { SettingsPage } from '../SettingsPage'
import { ResumeGamePage } from '../ResumeGamePage'
import { AboutPage } from '../AboutPage'

/**
 * App. Register all pages here.
 */
export function App() {
    return (
        <>
            <PortalPage />
            <SettingsPage />
            <ResumeGamePage />
            <GameSelectionPage />
            <GameSettingsPage />
            <ClockPage />
            <AboutPage />
        </>
    )
}