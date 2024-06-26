import tapAudio from '../../assets/sounds/beep.wav'
import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'
import { OngoingState } from '../BoardGameState'
import { ReusableAudio } from './ReusableAudio'

export class TapAudioPlugin extends BoardGamePlugin {
    private audio = new ReusableAudio()

    public override async onStart() {
        await this.audio.fetch(tapAudio)
        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler(PlayerTapEvent, () => {
            if (this.boardGame.isState(OngoingState)) {
                this.audio.play()
            }
        })
    }
}
