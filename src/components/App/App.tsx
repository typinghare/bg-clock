import React from 'react'
import { PortalPage } from '../PortalPage'
import { GameSelectionPage } from '../GameSelectionPage'
import { SettingsPage } from '../SettingsPage'
import { AboutPage } from '../AboutPage'
import { ResumeGamePage } from '../ResumeGamePage'
import { GameSettingsPage } from '../GameSettingsPage'
import { ClockPage } from '../ClockPage/ClockPage'

/**
 * This is the unique index to the application. Put and only put all pages within the empty tag.
 */
export function App() {
    return (
        <>
            <PortalPage />
            <GameSelectionPage />
            <GameSettingsPage />
            <ClockPage />
            <ResumeGamePage />
            <SettingsPage />
            <AboutPage />
        </>
    )
}
