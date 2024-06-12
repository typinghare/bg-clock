import { TimeControl } from './TimeControl'
import { Context, ContextData, float, Game } from '@typinghare/game-core'
import { Player, Role } from './Player'
import { BoardGameState, NotStartedState } from './BoardGameState'
import { PlayerTapEvent } from './event/PlayerTapEvent'
import { BoardGameRequest } from './BoardGameRequest'
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
     * A store containing players and associated roles.
     * @private
     */
    protected playerStore: Map<Role, Player> = new Map()

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
     * Game object from @typinghare/game-core.
     * @protected
     */
    protected game?: Game

    /**
     * Plugin list.
     * @protected
     */
    protected pluginList: BoardGamePlugin[] = []

    /**
     * Creates a board game.
     * @param timeControlList A list of available time controls.
     * @param roleList A list of roles in the board game.
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
        this.playerStore.clear()

        // Initialize players
        for (const role of this.roleList) {
            this.playerStore.set(role, timeControl.createPlayer(role, this))
        }
    }

    /**
     * Returns a shallow copy of the player list.
     */
    public getPlayerList(): Player[] {
        return [...this.playerStore.values()]
    }

    /**
     * All players get ready. After this method is being called, time control cannot be changed.
     */
    public getReady(): void {
        this.getPlayerList().forEach(player => {
            player.getReady()
        })
    }

    /**
     * Starts the board game.
     * @return The game object.
     */
    public start(): Game {
        // Create a game
        this.game = new Game((deltaTime: float) => {
            this.updatePlayerDeltaTime(deltaTime)
        })
        this.game.getContext<BoardGameContextData>().setValue('boardGame', this)

        // Register handlers
        const eventManager = this.game.getContext().eventManager
        eventManager.addHandler(PlayerTapEvent, (gameEvent) => {
            const role: Role = gameEvent.getValue('role')
            this.onPlayerTap(role)
        })

        this.pluginList.forEach(plugin => plugin.onStart())

        this.game.run(60)

        return this.game
    }

    protected updatePlayerDeltaTime(deltaTime: float) {
        this.getPlayerList().forEach((player) => {
            player.update(deltaTime)
        })
    }

    /**
     * This method is called when a player taps their screen.
     * @param role The role of the player.
     * @protected
     */
    protected onPlayerTap(role: Role): void {
        this.getPlayer(role).onTap()
    }

    /**
     * Returns the next role.
     * @param role The current role.
     * @protected
     */
    protected getNextRole(role: Role): Role {
        const roleList: Role[] = [...this.playerStore.keys()]
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
        const player = this.playerStore.get(role)
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

    /**
     * Returns the game.
     */
    public getGame(): Game | undefined {
        return this.game
    }

    /**
     * Returns board game state.
     */
    public getState(): BoardGameState {
        return this.state
    }

    /**
     * Returns game context.
     */
    public getGameContext(): Context {
        const context = this.game?.getContext()
        if (!context) {
            throw new Error('Fail to get game context.')
        }

        return context
    }

    /**
     * Handles a request.
     * @param request The request to handle.
     */
    public handleRequest(request: BoardGameRequest): void {
        this.state = this.state.handle(request)
    }

    /**
     * Checks whether the state of this board game is the same as the given one.
     * @param state The given state.
     */
    public isState(state: new () => BoardGameState): boolean {
        return this.state instanceof state
    }

    /**
     * Returns the selected time control.
     */
    public getTimeControl(): TimeControl {
        return this.timeControl
    }
}

/**
 * Board game plugin.
 */
export abstract class BoardGamePlugin {
    /**
     * Creates a board game plugin
     * @param boardGame The board game creating this plugin.
     */
    public constructor(
        protected boardGame: BoardGame,
    ) {
    }

    /**
     * This method is called when the board game starts.
     */
    public onStart(): void {
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

export interface BoardGameContextData extends ContextData {
    boardGame: BoardGame
}
