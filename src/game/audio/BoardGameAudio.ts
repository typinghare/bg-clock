import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'

/**
 * Board game audio plugin.
 */
export class BoardGameAudio extends BoardGamePlugin {
    public override onStart() {
        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler(PlayerTapEvent, () => {

        })
    }
}