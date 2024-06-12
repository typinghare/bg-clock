import { BoardGames, BoardGameType } from './BoardGames'
import { BoardGame } from './BoardGame'
import { PlayerExtraData, Role } from './Player'

export class BoardGameSave {
    public constructor(
        private readonly boardGameSaveObject: BoardGameSaveObject,
    ) {
    }

    public static fromBoardGame(boardGame: BoardGame) {
        const playerSaveObjectList: PlayerSaveObject[] = []
        for (const player of boardGame.getPlayerList()) {
            playerSaveObjectList.push({
                role: player.getRole(),
                remainingTime: player.getTime().ms,
                paused: player.isPaused(),
                extraData: player.getExtraData().getData(),
            })
        }

        return new BoardGameSave({
            timestamp: new Date().getTime(),
            type: BoardGames.getBoardGameType(boardGame),
            players: playerSaveObjectList,
        })
    }

    public toJson(): string {
        return JSON.stringify(this.boardGameSaveObject)
    }
}

export interface BoardGameSaveObject {
    timestamp: number
    type: BoardGameType
    players: PlayerSaveObject[]
}

export interface PlayerSaveObject {
    role: Role
    remainingTime: number,
    paused: boolean,
    extraData: PlayerExtraData
}
