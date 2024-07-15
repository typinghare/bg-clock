import { TimeControl } from '../../TimeControl'
import { Player, PlayerExtraData, PlayerSettings, Role } from '../../Player'
import { Datum } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { BoardGame } from '../../BoardGame'

/**
 * Go Yingshi time control.
 */
export class GoYingshiTimeControl extends TimeControl {
    public override createPlayer(role: Role, boardGame: BoardGame): GoYingshiPlayer {
        return new GoYingshiPlayer(role, boardGame, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(60)).setMetadata({
                type: 'time',
                label: 'Main Time',
                description: 'The initial allotted time for a player to make moves without any additional constraints.',
                optionList: [
                    HourMinuteSecond.ofMinutes(30),
                    HourMinuteSecond.ofMinutes(60),
                    HourMinuteSecond.ofMinutes(90),
                    HourMinuteSecond.ofMinutes(120),
                ],
            }),
            penaltyTime: Datum.of(HourMinuteSecond.ofMinutes(30)).setMetadata({
                type: 'time',
                label: 'Penalty Time',
                description: 'The time of one penalty. Once the main time has elapsed, penalty time will ' +
                    'be activated and used.',
                optionList: [
                    HourMinuteSecond.ofMinutes(20),
                    HourMinuteSecond.ofMinutes(30),
                    HourMinuteSecond.ofMinutes(40),
                ],
            }),
            penalties: Datum.of(2).setMetadata({
                type: 'number',
                label: 'Penalties',
                description: 'The maximum number of penalties.',
                optionList: [1, 2, 3],
            }),
        }, {
            penaltiesUsed: Datum.of(0).setMetadata({
                isDisplayed: true,
                getDisplayedContent: (value: number) => value.toString(),
            }),
        })
    }

    public override getName(): string {
        return 'Yingshi'
    }

    public override getDescription(): string {
        return 'Yingshi time control begins with an initial time pool. When this time is used up, players face ' +
            'successive stages, each with its own time limit. Not moving within a stage results in penalties, with ' +
            'the stages resetting in subsequent turns.'
    }
}

export class GoYingshiPlayer extends Player<YingshiPlayerSettings, GoYingshiPlayerExtraData> {
    public override getReady() {
        this.setTime(this.getValue('mainTime'))
    }

    public override runOutTime(): void {
        const penaltiesUsed: number = this.extraData.getValue('penaltiesUsed')
        const penalties: number = this.getValue('penalties')
        if (penaltiesUsed === penalties) {
            return super.runOutTime()
        }

        this.extraData.get('penaltiesUsed').setValue(penaltiesUsed - 1)
        const penaltyTime = this.getValue('penaltyTime')
        this.setTime(penaltyTime)
    }
}

/**
 * Go Yingshi time control player settings.
 */
export interface YingshiPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
    penaltyTime: HourMinuteSecond
    penalties: number
}

/**
 * Go Yingshi player extra data.
 */
export interface GoYingshiPlayerExtraData extends PlayerExtraData {
    penaltiesUsed: number
}
