import { DataCollection, DataMapping } from '@typinghare/extrum'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { float, FrameUpdatable } from '@typinghare/game-core'
import { BoardGame, BoardGameSettingsMetadata } from './BoardGame'
import { BoardGameEndEvent } from './event/BoardGameEndEvent'
import { PlayerRunOutTimeRequest, PlayerTapRequest } from './BoardGameRequest'

/**
 * Board Game player.
 */
export class Player<
    PS extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraData = PlayerExtraData
> extends DataCollection<PS, BoardGameSettingsMetadata> implements FrameUpdatable {
    /**
     * Time.
     * @protected
     */
    protected time: HourMinuteSecond = HourMinuteSecond.ofSeconds(0)

    /**
     * Whether the player is paused.
     * @protected
     */
    protected paused: boolean

    /**
     * Player extra data.
     * @protected
     */
    protected extraData: DataCollection<PE, PlayerExtraDataMetadata>

    /**
     * Creates a player.
     * @param role The role of this player.
     * @param boardGame The board game creating this player.
     * @param playerData Initial player data.
     * @param extraData Player extra data
     */
    public constructor(
        protected readonly role: Role,
        protected readonly boardGame: BoardGame,
        playerData: DataMapping<PS, BoardGameSettingsMetadata>,
        extraData: DataMapping<PE, PlayerExtraDataMetadata>,
    ) {
        super(playerData)
        this.paused = true
        this.extraData = new DataCollection<PE, PlayerExtraDataMetadata>(extraData)
    }

    /**
     * Player gets ready. This function is invoked before the game is started.
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
    public update(deltaTime: float): void {
        if (!this.paused) {
            this.time.consume(deltaTime)
        }

        if (this.time.ms <= 0) {
            this.setTime(HourMinuteSecond.ofSeconds(0))
            this.runOutTime()
        }
    }

    /**
     * This player runs out of time.
     */
    public runOutTime(): void {
        const context = this.boardGame.getGame()?.getContext()
        if (!context) {
            throw new Error('Context does not exist')
        }

        context.eventManager.trigger(new BoardGameEndEvent({ role: this.role }))
        this.boardGame.handleRequest(new PlayerRunOutTimeRequest())
    }

    /**
     * Player taps the touch screen.
     */
    public onTap(): void {
        this.pause()
        this.boardGame.handleRequest(new PlayerTapRequest())
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
     * Returns the extra data of this player.
     */
    public getExtraData(): DataCollection<PE, PlayerExtraDataMetadata> {
        return this.extraData
    }

    /**
     * Sets extra data.
     * @param extraData
     */
    public setExtraData(extraData: PE): void {
        this.extraData.map((datum, key) => {
            if (Object.prototype.hasOwnProperty.call(extraData, key)) {
                datum.setValue(extraData[key])
            }
        })
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

/**
 * Player extra data.
 */
export interface PlayerExtraData {
    [key: string]: unknown
}

export type PlayerExtraDataMetadata = {
    // Whether to display this item
    isDisplayed: false
    getDisplayedContent?: undefined
} | {
    // Whether to display this item
    isDisplayed: true
    getDisplayedContent: (value: any) => string
}
