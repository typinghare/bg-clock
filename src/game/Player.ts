import { DataCollection, DataMapping } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { float, FrameUpdatable } from '@typinghare/game-core'
import { BoardGameAttribute, BoardGameSettingsMetadata } from './BoardGame'

/**
 * Board Game player.
 */
export class Player<
    PS extends PlayerSettings = PlayerSettings
> extends DataCollection<PS, BoardGameSettingsMetadata> implements FrameUpdatable {
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
        playerData: DataMapping<PS, BoardGameSettingsMetadata>,
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
    public getAttributeList(): BoardGameAttribute[] {
        return super.getDatumList() as BoardGameAttribute[]
    }
}

/**
 * Player settings.
 */
export type PlayerSettings = {
    [key: string]: unknown
};

/**
 * Player role.
 */
export type Role = string