import { TimeControl, TimeControlSettings } from '../../TimeControl';
import { Time } from '../../../common/Time';
import { Timer } from '../../Timer';

export type GoByoyomiTimeControlSettings = TimeControlSettings & {}

/**
 * Go time control (Byoyomi).
 * @chinese 读秒
 * @japanese 秒読み
 */
export class GoByoyomiTimeControl extends TimeControl {
    /**
     * Creates a Go byoyomi time control.
     * @param settings
     */
    public constructor(settings: GoByoyomiTimeControlSettings) {
        super(settings);
    }


    /**
     * Initializes a timer.
     * @override
     */
    public initTimer(): Timer {
        const settings = this.settings as GoByoyomiTimeControlSettings;
        return new Timer({
            time: settings.mainTime,
            timeoutTolerance: new Time(Time.SECOND),
            timeoutCallback: (): Time | undefined => {
                const periodsLeft = this.getPeriodsLeft();
                if (periodsLeft <= 1) {
                    this.timerEnd();
                    return undefined;
                }

                this.setPeriodsLeft(periodsLeft - 1);
                return settings.timePerPeriod;
            },
        });
    }
}