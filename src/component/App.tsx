import React from 'react'
import { GameSettingsPage } from './GameSettingsPage'
import { ClockPage } from './ClockPage'
import { GameSelectPage } from './GameSelectPage'
import { Portal } from '@mui/material'

/**
 * Application.
 * @constructor
 */
export function App(): JSX.Element {
    // Pages are collected here.
    return <>
        <Portal />
        <GameSelectPage />
        <GameSettingsPage />
        <ClockPage />
    </>
}