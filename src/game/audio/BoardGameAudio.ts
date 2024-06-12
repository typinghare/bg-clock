import { BoardGamePlugin } from '../BoardGame'
import { PlayerTapEvent } from '../event/PlayerTapEvent'

import beep from '../../assets/sounds/beep.wav'
import countdown1 from '../../assets/sounds/countdown/1.mp3'
import countdown2 from '../../assets/sounds/countdown/2.mp3'
import countdown3 from '../../assets/sounds/countdown/3.mp3'
import countdown4 from '../../assets/sounds/countdown/4.mp3'
import countdown5 from '../../assets/sounds/countdown/5.mp3'
import countdown6 from '../../assets/sounds/countdown/6.mp3'
import countdown7 from '../../assets/sounds/countdown/7.mp3'
import countdown8 from '../../assets/sounds/countdown/8.mp3'
import countdown9 from '../../assets/sounds/countdown/9.mp3'
import { CountdownEvent, CountDownEventData } from '../event/CountdownEvent'

/**
 * Board game audio plugin.
 */
export class BoardGameAudio extends BoardGamePlugin {
    private readonly beepAudio: HTMLAudioElement = new Audio(beep)
    private readonly countdownAudioList: HTMLAudioElement[] = [
        new Audio(countdown1),
        new Audio(countdown2),
        new Audio(countdown3),
        new Audio(countdown4),
        new Audio(countdown5),
        new Audio(countdown6),
        new Audio(countdown7),
        new Audio(countdown8),
        new Audio(countdown9),
    ]

    public override onStart() {
        const gameContext = this.boardGame.getGameContext()

        // Load all audio files
        this.beepAudio.load()
        for (const countdownAudio of this.countdownAudioList) {
            countdownAudio.load()
        }

        // Add handler for PlayerTapEvent
        gameContext.eventManager.addHandler(PlayerTapEvent, () => {
            // Create a copy of beepSoundEffectAudio and play it
            this.playAudio(this.beepAudio)
        })

        // Add handler for countdown
        gameContext.eventManager.addHandler<CountDownEventData>(CountdownEvent, (eventData) => {
            const seconds = eventData.getValue('seconds')
            if (seconds >= 0 && seconds < 10) {
                this.playAudio(this.countdownAudioList[seconds - 1])
            }
        })
    }

    /**
     * Creates a copy of beepSoundEffectAudio and play it
     * @param audio The audio to play.
     * @private
     */
    private playAudio(audio: HTMLAudioElement): void {
        const clonedAudio = audio.cloneNode() as HTMLAudioElement
        clonedAudio.play().catch(error => {
            console.error('Error playing the audio: ', error)
        })
    }
}
