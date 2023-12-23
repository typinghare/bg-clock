import { TimeControl } from './TimeControl'
import { float, Game } from '@typinghare/game-core'
import { Player, Role } from './Player'
import { BoardGameState, NotStartedState } from './BoardGameState'
import { PlayerTapEvent } from './event/PlayerTapEvent'
import { PlayerTapRequest } from './BoardGameRequest'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { AdvancedSettings } from './AdvancedSettings'
import { Datum } from '@typinghare/extrum'

/**
 * Board game.
 */
export class BoardGame {
    /**
     * Selected time control.
     * @private
     */
    protected timeControl: TimeControl

    /**
     * Mapping from roles to players.
     * @private
     */
    protected byRole: Map<Role, Player> = new Map()

    /**
     * Board game current state.
     * @private
     */
    protected state: BoardGameState = new NotStartedState()

    /**
     * Advanced settings.
     * @protected
     */
    protected advancedSettings: AdvancedSettings = new AdvancedSettings()

    /**
     * Creates a board game.
     * @param timeControlList
     * @param roleList
     */
    public constructor(
        protected readonly timeControlList: TimeControl[],
        protected readonly roleList: Role[],
    ) {
        this.timeControl = timeControlList[0]
        this.selectTimeControl(timeControlList[0])
    }

    /**
     * Returns time control list.
     */
    public getTimeControlList(): TimeControl[] {
        return this.timeControlList
    }

    /**
     * Selects a time control.
     * @param timeControl The time control to select.
     */
    public selectTimeControl(timeControl: TimeControl): void {
        if (!this.timeControlList.includes(timeControl)) {
            throw new Error('Time control not in the list')
        }

        // Set time control
        this.timeControl = timeControl

        // Reset
        this.byRole.clear()

        // Initialize players
        for (const role of this.roleList) {
            this.byRole.set(role, timeControl.createPlayer(role))
        }
    }

    /**
     * Returns the player list.
     */
    public getPlayerList(): Player[] {
        return [...this.byRole.values()]
    }

    /**
     * Players get ready.
     */
    public getReady(): void {
        this.getPlayerList().forEach(player => {
            player.getReady()
        })
    }

    /**
     * Starts the board game.
     */
    public start(): void {
        const game = new Game((deltaTime: float) => {
            console.log(deltaTime)
            this.getPlayerList().forEach((player) => {
                player.update(deltaTime)
            })
        })

        // Register handlers
        const eventManager = game.getContext().eventManager
        eventManager.addHandler(PlayerTapEvent, (gameEvent) => {
            const role: Role = gameEvent.getValue('role')
            const player: Player | undefined = this.getPlayer(role)

            this.state.handle(new PlayerTapRequest(player))

            // Pause the player if their time is running
            if (!player.isPaused()) {
                player.pause()
            }

            // Resume the next player
            const nextPlayer: Player = this.getPlayer(this.getNextRole(role))
            nextPlayer.resume()
        })
    }

    /**
     * Returns the next role.
     * @param role The current role.
     * @protected
     */
    protected getNextRole(role: Role): Role {
        const roleList: Role[] = [...this.byRole.keys()]
        if (!roleList.includes(role)) {
            throw new Error('')
        }

        const index: number = roleList.indexOf(role)
        return roleList[(index + 1) % roleList.length]
    }

    /**
     * Gets the player by the associated role.
     * @param role The role of the player.
     */
    public getPlayer(role: Role): Player {
        const player = this.byRole.get(role)
        if (!player) {
            throw new PlayerNotExistException(role)
        }

        return player
    }

    /**
     * Returns the advanced settings of this game.
     */
    public getAdvancedSettings(): AdvancedSettings {
        return this.advancedSettings
    }
}

/**
 * Thrown when the player of a specific role does not exist.
 */
export class PlayerNotExistException extends Error {
    public constructor(role: Role) {
        super(`${role}.`)
    }
}

/**
 * Board game settings metadata.
 */
export interface BoardGameSettingsMetadata {
    type: 'bool' | 'number' | 'time'
    label: string
    description: string
    optionList?: (number | HourMinuteSecond)[]
}

/**
 * Board game attribute value.
 */
export type BoardGameAttributeValue = boolean | number | HourMinuteSecond

/**
 * Board Game attribute.
 */
export type BoardGameAttribute = Datum<BoardGameAttributeValue, BoardGameSettingsMetadata>

/**
 * Board game expanded attribute value.
 */
export type BoardGameExpandedAttributeValue = Exclude<BoardGameAttributeValue, boolean>