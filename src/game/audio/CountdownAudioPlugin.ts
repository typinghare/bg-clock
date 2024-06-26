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
import { ReusableAudio } from './ReusableAudio'

const countDownAudioUrls: string[] = [
    countdown1,
    countdown2,
    countdown3,
    countdown4,
    countdown5,
    countdown6,
    countdown7,
    countdown8,
    countdown9,
]

export class CountdownAudioPlugin extends BoardGamePlugin {
    private readonly countdownAudioList: ReusableAudio[] = []

    public override async onStart(): Promise<void> {
        for (let i = 0; i < 9; i++) {
            this.countdownAudioList.push(new ReusableAudio())
            await this.countdownAudioList[i].fetch(countDownAudioUrls[i])
        }

        const gameContext = this.boardGame.getGameContext()
        gameContext.eventManager.addHandler<CountDownEventData>(CountdownEvent, (eventData) => {
            const seconds = eventData.getValue('seconds')
            this.playAudio(seconds)
        })
    }

    public playAudio(seconds: number) {
        if (seconds > 0 && seconds < 10) {
            this.countdownAudioList[seconds - 1].play()
        }
    }
}
