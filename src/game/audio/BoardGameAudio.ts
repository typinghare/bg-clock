import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'
import beepSoundEffect from '../../assets/sounds/beep.wav'

/**
 * Board game audio plugin.
 */
export class BoardGameAudio extends BoardGamePlugin {
    public override onStart() {
        const gameContext = this.boardGame.getGameContext()
        console.log(beepSoundEffect)

        // Add handler for PlayerTapEvent
        gameContext.eventManager.addHandler(PlayerTapEvent, (playerTapEvent) => {
            const role = playerTapEvent.getValue('role')
            const boardGame = this.boardGame
            console.log(role)
            console.log(boardGame)
        })
    }
}
