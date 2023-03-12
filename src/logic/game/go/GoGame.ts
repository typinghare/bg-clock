import { Game, GameEndCallback, GameOptions } from '../../Game';
import { PlayerOptions } from '../../Player';
import { Role } from '../../Role';
import { TimerEndCallback } from '../../TimeControl';
import { Time } from '../../../common/Time';
import { GoByoyomiTimeControl } from './GoByoyomiTimeControl';

export type GoGameOptions = GameOptions & {}

export type GoPlayerOptions = PlayerOptions & {}

export const goOptionsMaps: {
    [K in keyof GoPlayerOptions]: {
        [item: string]: GoPlayerOptions[K]
    }
} = {
    mainTime: {
        '1 min': Time.minute(1),
        '10 min': Time.minute(10),
        '30 min': Time.minute(30),
        '60 min': Time.minute(60),
        '90 min': Time.minute(90),
        '120 min': Time.minute(120),
    },
    timePerPeriod: {
        '10 sec': Time.second(10),
        '30 sec': Time.second(30),
        '40 sec': Time.second(40),
        '60 sec': Time.second(60),
    },
    periods: {
        '1': 2,
        '3': 3,
        '5': 5,
        '10': 10,
    },
};

export const goOptionsDefaultValues: {
    [K in keyof GoPlayerOptions]: number
} = {
    mainTime: 0,
    timePerPeriod: 0,
    periods: 1,
};

/**
 * Go.
 */
export class GoGame extends Game<GoGameOptions, GoPlayerOptions> {
    /**
     * Initializes this game
     * @override
     */
    public init(): void {
        [Role.A, Role.B].forEach(role => {
            const player = this.getPlayer(role);
            const defaultMainTime: Time
                = Object.values(goOptionsMaps.mainTime)[goOptionsDefaultValues.mainTime];
            const defaultTimePerPeriod: Time
                = Object.values(goOptionsMaps.timePerPeriod)[goOptionsDefaultValues.timePerPeriod];
            const defaultPeriods: number
                = Object.values(goOptionsMaps.periods)[goOptionsDefaultValues.periods];

            player.setOption('mainTime', defaultMainTime);
            player.setOption('timePerPeriod', defaultTimePerPeriod);
            player.setOption('periods', defaultPeriods);
        });
    }

    /**
     * @override
     */
    public starts(gameEndCallback: GameEndCallback): void {
        [Role.A, Role.B].forEach(role => {
            const player = this.getPlayer(role);
            const mainTime: Time = player.getOption('mainTime');
            const timePerPeriod: Time = player.getOption('timePerPeriod');
            const periods: number = player.getOption('periods');
            const timerEndCallback: TimerEndCallback = () => {
                gameEndCallback(role);
            };

            const timeControl: GoByoyomiTimeControl = new GoByoyomiTimeControl({
                timerEndCallback, mainTime, timePerPeriod, periods,
            });
            timeControl.initTimer();

            player.setTimeControl(timeControl);
        });
    }

    /**
     * @override
     * @param role
     */
    public playerClick(role: Role): void {
        const clickPlayer = this.getPlayer(role);
        const otherPlayer = this.getPlayer(Role.switch(role));

        if (clickPlayer.timeControl.isEnd() || clickPlayer.timeControl.isEnd()) {
            return;
        }

        const isClickPlayerRunning = clickPlayer.timeControl.isTimerRunning();
        const isOtherPlayerRunning = otherPlayer.timeControl.isTimerRunning();
        if (!isClickPlayerRunning && isOtherPlayerRunning) {
            return;
        }

        clickPlayer.timeControl.pauseTimer();
        otherPlayer.timeControl.resumeTimer();
    }
}