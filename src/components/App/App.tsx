import React from 'react'
import { PortalPage } from '../PortalPage'
import { GameSelectionPage } from '../GameSelectionPage'
import { SettingsPage } from '../SettingsPage'
import { AboutPage } from '../AboutPage'
import { ResumeGamePage } from '../ResumeGamePage'
import { GameSettingsPage } from '../GameSettingsPage'

/**
 * This is the unique index to the application. Put and only put all pages within the empty tag.
 */
export function App() {
    return (
        <>
            <PortalPage />
            <GameSelectionPage />
            <GameSettingsPage />
            <ResumeGamePage />
            <SettingsPage />
            <AboutPage />
        </>
    )
}
