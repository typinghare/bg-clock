import { DataCollection, DataMapping, Datum } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { float, FrameUpdatable } from '@typinghare/game-core'

/**
 * Board Game player.
 */
export class Player<
    PS extends PlayerSettings = PlayerSettings
> extends DataCollection<PS, PlayerSettingsMetadata> implements FrameUpdatable {
    /**
     * Time.
     * @protected
     */
    protected time: HourMinuteSecond = HourMinuteSecond.ofSeconds(0)

    /**
     * Whether
     * @protected
     */
    protected paused: boolean

    /**
     * Creates a player.
     * @param role The role of this player.
     * @param playerData Initial player data.
     */
    public constructor(
        protected readonly role: Role,
        playerData: DataMapping<PS, PlayerSettingsMetadata>,
    ) {
        super(playerData)
        this.paused = true
    }

    /**
     * Player gets ready.
     */
    public getReady(): void {
        this.time = HourMinuteSecond.ofSeconds(0)
    }

    /**
     * Returns the time of this player.
     */
    public getTime(): HourMinuteSecond {
        return this.time.clone()
    }

    /**
     * Sets the time for this user.
     * @param time The user to set.
     */
    public setTime(time: HourMinuteSecond): void {
        this.time = time.clone()
    }

    /**
     * Returns the role of this player.
     */
    public getRole(): Role {
        return this.role
    }

    /**
     * Updates time.
     * @param deltaTime the delta time passed.
     */
    public update(deltaTime: float) {
        if (!this.paused) {
            this.time.consume(deltaTime)
        }
    }

    /**
     * Whether this player is paused.
     */
    public isPaused(): boolean {
        return this.paused
    }

    /**
     * Pauses this player.
     */
    public pause(): void {
        this.paused = true
    }

    /**
     * Resumes this player.
     */
    public resume(): void {
        this.paused = false
    }

    /**
     * Returns the attribute list (datum list).
     */
    public getAttributeList(): PlayerAttribute[] {
        return super.getDatumList() as PlayerAttribute[]
    }
}

/**
 * Player settings.
 */
export type PlayerSettings = {
    [key: string]: unknown
};

/**
 * Player settings metadata.
 */
export interface PlayerSettingsMetadata {
    type: 'bool' | 'number' | 'time'
    label: string
    description: string
    optionList?: (number | HourMinuteSecond)[]
}

/**
 * Player role.
 */
export type Role = string

/**
 * Player attribute value.
 */
export type PlayerAttributeValue = boolean | number | HourMinuteSecond

/**
 * Player attribute.
 */
export type PlayerAttribute = Datum<PlayerAttributeValue, PlayerSettingsMetadata>