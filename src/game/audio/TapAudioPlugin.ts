import tapAudio from '../../assets/sounds/beep.wav'
import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'

export class TapAudioPlugin extends BoardGamePlugin {
    private readonly tapAudio: HTMLAudioElement = new Audio(tapAudio)

    public override onStart() {
        this.tapAudio.load()

        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler(PlayerTapEvent, () => {
            const clonedAudio = this.tapAudio.cloneNode() as HTMLAudioElement
            clonedAudio.play().catch(error => {
                console.error('Error playing the audio: ', error)
            })
        })
    }
}
