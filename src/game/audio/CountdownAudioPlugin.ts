import { BoardGamePlugin } from '../BoardGame'

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
export class CountdownAudioPlugin extends BoardGamePlugin {
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
        for (const countdownAudio of this.countdownAudioList) {
            countdownAudio.load()
        }

        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler<CountDownEventData>(CountdownEvent, (eventData) => {
            const seconds = eventData.getValue('seconds')
            if (seconds > 0 && seconds < 10) {
                const audio = this.countdownAudioList[seconds - 1]
                audio.currentTime = 0
                audio.play().catch(error => {
                    console.error('Error playing the audio: ', error)
                })
            }
        })
    }
}
