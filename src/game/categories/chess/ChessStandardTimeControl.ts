import { DefaultPlayerSettings, TimeControl } from '../../TimeControl'
import { Player, PlayerExtraData, PlayerSettings, Role } from '../../Player'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { BoardGame } from '../../BoardGame'
import { Datum } from '@typinghare/extrum'

export class ChessStandardTimeControl extends TimeControl {
    public override createPlayer(role: Role, boardGame: BoardGame): Player<DefaultPlayerSettings> {
        return new ChessStandardPlayer(role, boardGame, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(30)).setMetadata({
                type: 'time',
                label: 'Main Time (G)',
                description: 'The initial allotted time a player has to make their moves in a chess game without any ' +
                    'additional time added after each move.',
                optionList: [
                    HourMinuteSecond.ofMinutes(30),
                    HourMinuteSecond.ofMinutes(60),
                    HourMinuteSecond.ofMinutes(90),
                ],
            }),
            timeIncrement: Datum.of(HourMinuteSecond.ofSeconds(5)).setMetadata({
                type: 'time',
                label: 'Time Increment',
                description: 'An additional amount of time added to a player\'s clock after each move. It provides a ' +
                    'small increase in the available time for a player to make their moves, helping to prevent time ' +
                    'pressure as each move grants a time boost.',
                optionList: [
                    HourMinuteSecond.ofSeconds(20),
                    HourMinuteSecond.ofSeconds(30),
                    HourMinuteSecond.ofSeconds(40),
                ],
            }),
        }, {
            lastResumedTime: Datum.of(HourMinuteSecond.ofSeconds(0)),
        })
    }

    public override getName(): string {
        return 'Standard'
    }

    public override getDescription(): string {
        return 'Each player begin with a fixed amount of time, with an increment per move. Specifically, after ' +
            'making a move, a player\'s clock is incremented by the specified time'
    }
}

export class ChessStandardPlayer extends Player<ChessStandardPlayerSettings, ChessStandardPlayerExtraData> {

    public override getReady() {
        super.getReady()
        this.setTime(this.getValue('mainTime'))

        // this.extraData.getDatum('lastResumedTime').setValue(this.getValue('mainTime'))
    }

    public override pause() {
        const currentTime = this.getTime()
        const timeUsedMs: number = this.extraData.getValue('lastResumedTime').ms - currentTime.ms
        const timeIncrement = this.getValue('timeIncrement')
        if (timeUsedMs > timeIncrement.ms) {
            this.setTime(currentTime.extend(timeIncrement))
        }

        super.pause()
    }

    public override resume() {
        this.extraData.getDatum('lastResumedTime').setValue(this.getTime())
        super.resume()
    }
}

/**
 * Chess standard time control player settings.
 */
export interface ChessStandardPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
    timeIncrement: HourMinuteSecond
}

/**
 * Chess standard player extra data.
 */
export interface ChessStandardPlayerExtraData extends PlayerExtraData {
    lastResumedTime: HourMinuteSecond
}