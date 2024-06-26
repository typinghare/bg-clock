import { TimeControl } from '../../TimeControl'
import { Player, PlayerExtraData, PlayerSettings, Role } from '../../Player'
import { Datum } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { BoardGame } from '../../BoardGame'
import { OngoingState } from '../../BoardGameState'

/**
 * Go Byoyomi time control.
 */
export class GoByoyomiTimeControl extends TimeControl {
    public override createPlayer(role: Role, boardGame: BoardGame): GoByoyomiPlayer {
        return new GoByoyomiPlayer(role, boardGame, {
            mainTime: Datum.of(HourMinuteSecond.ofMinutes(5)).setMetadata({
                type: 'time',
                label: 'Main Time',
                description: 'The initial allotted time for a player to make moves without any additional constraints.',
                optionList: [
                    HourMinuteSecond.ofMinutes(1),
                    HourMinuteSecond.ofMinutes(5),
                    HourMinuteSecond.ofMinutes(30),
                    HourMinuteSecond.ofMinutes(60),
                    HourMinuteSecond.ofMinutes(180),
                ],
            }),
            timePerPeriod: Datum.of(HourMinuteSecond.ofSeconds(30)).setMetadata({
                type: 'time',
                label: 'Time Per Period',
                description: 'The time given for each subsequent phase after the main time runs out is reduced by ' +
                    'one period. If a player completes their moves within the time limit of a period, the number ' +
                    'of periods remains the same and the time for the next period is reset for the next turn.',
                optionList: [
                    HourMinuteSecond.ofSeconds(20),
                    HourMinuteSecond.ofSeconds(30),
                    HourMinuteSecond.ofSeconds(40),
                    HourMinuteSecond.ofSeconds(60),
                ],
            }),
            periods: Datum.of(3).setMetadata({
                type: 'number',
                label: 'Periods',
                description: 'The number of periods. The clock will stop running when all the periods are used up.',
                optionList: [
                    1, 3, 5, 10,
                ],
            }),
        }, {
            hasEnteredByoyomi: Datum.of(false).setMetadata({
                isDisplayed: false,
            }),
            remainingPeriods: Datum.of(5).setMetadata({
                isDisplayed: true,
                getDisplayedContent: (value: number) => (value.toString()),
            }),
        })
    }

    public override getName(): string {
        return 'Byoyomi'
    }

    public override getDescription(): string {
        return 'Players begin with a main time allocation; once depleted, they enter periods of additional time, ' +
            'resetting each turn. Failure to make a move within a period consumes that time segment.'
    }
}

/**
 * Go Byoyomi board game player.
 */
export class GoByoyomiPlayer extends Player<GoByoyomiPlayerSettings, GoByoyomiPlayerExtraData> {
    public override getReady(): void {
        this.setTime(this.getValue('mainTime'))

        // Remaining periods
        this.extraData.getDatum('remainingPeriods').setValue(this.getValue('periods'))
    }

    public override runOutTime(): void {
        const remainingPeriods: number = this.extraData.getValue('remainingPeriods')
        if (remainingPeriods == 1) {
            return super.runOutTime()
        }

        this.extraData.getDatum('remainingPeriods').setValue(remainingPeriods - 1)
        this.extraData.getDatum('hasEnteredByoyomi').setValue(true)

        const timePerPeriod: HourMinuteSecond = this.getValue('timePerPeriod')
        this.setTime(timePerPeriod)
    }

    public override resume() {
        super.resume()

        if (!this.boardGame.isState(OngoingState)) {
            return
        }

        if (this.extraData.getValue('hasEnteredByoyomi')) {
            const timePerPeriod: HourMinuteSecond = this.getValue('timePerPeriod')
            this.setTime(timePerPeriod.consume(1))
        }
    }
}

/**
 * Go Byoyomi time control player settings.
 */
export interface GoByoyomiPlayerSettings extends PlayerSettings {
    mainTime: HourMinuteSecond
    timePerPeriod: HourMinuteSecond
    periods: number
}

/**
 * Go Byoyomi player extra data.
 */
export interface GoByoyomiPlayerExtraData extends PlayerExtraData {
    hasEnteredByoyomi: boolean
    remainingPeriods: number
}
