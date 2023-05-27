import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { App } from './component/App'
import { GameManager } from './game/GameManager'
import { Role } from '@typinghare/board-game-clock-core'
import { GoByoyomiPlayer } from '@typinghare/board-game-clock-common'
import { GoGame } from './game/GoGame'

// initialize ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// redux application
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)

// Initialize game manager.
const gameManager = GameManager.INSTANCE
const game = new GoGame(GoByoyomiPlayer)
gameManager.game = game
// game.start()
// game.getPlayer(new Role('A')).onClick()

reportWebVitals()
