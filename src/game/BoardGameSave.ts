import { BoardGames, BoardGameType } from './BoardGames'
import { BoardGame } from './BoardGame'
import { PlayerExtraData, Role } from './Player'
import { enableFullScreen } from '../common/helper'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

export class BoardGameSave {
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

    public constructor(
        private readonly boardGameSaveObject: BoardGameSaveObject,
    ) {
    }

    public toJson(): string {
        return JSON.stringify(this.boardGameSaveObject)
    }

    public toBoardGame(): BoardGame {
        const boardGameType = this.boardGameSaveObject.type
        const boardGame = BoardGames.get(boardGameType)

        // Restore the game data
        for (const playerSaveObject of this.boardGameSaveObject.players) {
            const player = boardGame.getPlayer(playerSaveObject.role)
            if (!player) continue

            player.setTime(HourMinuteSecond.ofSeconds(playerSaveObject.remainingTime))
            if (!playerSaveObject.paused) player.resume()
            player.setExtraData(playerSaveObject.extraData)
        }

        boardGame.start()
        enableFullScreen()

        return boardGame
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
