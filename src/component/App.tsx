import React from 'react'
import { GameSettingsPage } from './GameSettingsPage'
import { ClockPage } from './ClockPage'
import { GameSelectPage } from './GameSelectPage'
import { PortalPage } from './PortalPage'

/**
 * Application.
 * @constructor
 */
export function App(): JSX.Element {
    // Pages are collected here.
    return <>
        <PortalPage />
        <GameSelectPage />
        <GameSettingsPage />
        <ClockPage />
    </>
}