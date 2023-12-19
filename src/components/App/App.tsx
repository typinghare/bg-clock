import logo from './logo.svg'
import { Counter } from './features/counter/Counter'
import './App.css'
import { TimeControl, TwoPlayerBoardGame } from './game'

function App() {
    const boardGame = new TwoPlayerBoardGame([new TimeControl()])
    boardGame.start()
    console.log(boardGame)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
            </header>
        </div>)
}

export default App
