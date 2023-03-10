import { AbstractTimeControl } from '../TimeControl';
import { Time } from '../Time';
import { Timer } from '../Timer';

export type GoByoyomiTimeControlSettings = {
    // the main time
    mainTime: Time,

    // the time of each period
    timePerPeriod: Time,

    // the number of periods
    periods: number
}

/**
 * Go time control (Byoyomi).
 */
export class GoByoyomiTimeControl extends AbstractTimeControl {
    /**
     * The number of periods left.
     * @private
     */
    private periodsLeft: number;

    /**
     * Creates a Go byoyomi time control.
     * @param settings
     */
    public constructor(settings: GoByoyomiTimeControlSettings) {
        super(settings);
        this.periodsLeft = settings.periods;
    }

    /**
     * Initializes a timer
     * @override
     */
    public initTimer(): void {
        const settings = this.settings as GoByoyomiTimeControlSettings;
        const timer = new Timer({
            time: settings.mainTime,
            timeoutTolerance: new Time(Time.SECOND),
            timeoutCallback: (): Time | undefined => {
                if (this.periodsLeft <= 1) return undefined;

                this.periodsLeft--;
                return settings.timePerPeriod;
            },
        });

        this.setTimer(timer);
    }
}