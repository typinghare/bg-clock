import tapAudio from '../../assets/sounds/beep.wav'
import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'
import { OngoingState } from '../BoardGameState'

export class TapAudioPlugin extends BoardGamePlugin {
    private audioContext: AudioContext = new AudioContext()
    private audioBuffer: AudioBuffer | null = null

    public override async onStart() {
        // Load the audio file and decode it
        const response = await fetch(tapAudio)
        const arrayBuffer = await response.arrayBuffer()
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)

        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler(PlayerTapEvent, () => {
            if (this.boardGame.isState(OngoingState)) {
                this.playAudio()
            }
        })
    }

    private playAudio() {
        if (!this.audioBuffer) {
            console.error('Audio buffer is not loaded yet.')
            return
        }

        const source = this.audioContext.createBufferSource()
        source.buffer = this.audioBuffer
        source.connect(this.audioContext.destination)
        source.start()
    }
}
