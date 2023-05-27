import React, { useState } from 'react'
import { Panel, PanelProps } from './Panel'
import { GameManager } from '../game/GameManager'
import {
    BoardGame,
    BoardGameSetting,
    BoardGameSettings,
    Player,
    PlayerClass,
    Role,
} from '@typinghare/board-game-clock-core'
import { GameSettingControl } from './GameSettingControl'
import { SettingsSection } from './SettingsSection'
import { CommonBoardGameSettings } from '@typinghare/board-game-clock-common'
import { SettingMap } from '@typinghare/settings'
import { TimeControlSelect } from './TimeControlSelect'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { changePanel, PanelEnum } from '../redux/slice/PanelSlice'
import { GameSettings } from '../game/games'
import { GoGame } from '../game/GoGame'

export type GameSettingsPanelProps = PanelProps & {}

export const GameSettingsPanel: React.FC<GameSettingsPanelProps> = function(props): JSX.Element {
    const { isShow } = props
    const dispatch = useDispatch()
    const [timeControl, setTimeControl] = useState('Byoyomi')

    function handleTimeControlSelect(newTimeControl: string): void {
        const game: BoardGame<GameSettings, any> = GameManager.INSTANCE.game
        const timeControlMap: Record<string, PlayerClass> = game.getSetting('timeControlMap').value
        const playerClass: PlayerClass = timeControlMap[newTimeControl]
        if (playerClass !== undefined) {
            GameManager.INSTANCE.game = new GoGame(playerClass)
        }

        setTimeControl(newTimeControl)
    }

    function handleGameStart(): void {
        GameManager.INSTANCE.startGame()

        dispatch(changePanel(PanelEnum.CLOCK))
    }

    const style: React.CSSProperties = {
        padding: '2em 1em 1em 1em !important',
        backgroundColor: '#EAEAEA',
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        marginBottom: '1em',
        alignItems: 'center',
        gap: '1em',
    }

    const timeControlSelectStyle: React.CSSProperties = {
        display: 'inline-block',
        flex: 10,
    }

    const gameStartButtonStyle: React.CSSProperties = {
        display: 'inline-block',
        flex: 3,
    }

    return <Panel isShow={isShow} sx={style}>
        <Box sx={containerStyle}>
            <TimeControlSelect
                sx={timeControlSelectStyle}
                initValue='Byoyomi'
                timeControlOptions={['Byoyomi', 'Yingshi']}
                onTimeControlSelect={handleTimeControlSelect}
            />
            <Button variant='contained' sx={gameStartButtonStyle} onClick={handleGameStart}>{'Game Start'}</Button>
        </Box>
        <PlayerSettingsSection roleString='A' timeControl={timeControl} />
        <PlayerSettingsSection roleString='B' timeControl={timeControl} />
        <GameSettingsSection />
    </Panel>
}

const GameSettingsSection: React.FC = function(): JSX.Element {
    const game: BoardGame<BoardGameSettings, any> = GameManager.INSTANCE.game
    const settings: SettingMap<BoardGameSettings> = game.getSettings()
    const gameSettingControlArray: JSX.Element[] = []
    for (const setting of Object.values(settings)) {
        const gameSettingControl: JSX.Element
            = <GameSettingControl key={setting.getProperty('label')} setting={setting as BoardGameSetting<any>} />
        gameSettingControlArray.push(gameSettingControl)
    }

    return <SettingsSection title='Advanced Game Settings' children={gameSettingControlArray} />
}

type PlayerSettingsProps = {
    roleString: string,
    timeControl: string,
}

const PlayerSettingsSection: React.FC<PlayerSettingsProps> = function(props): JSX.Element {
    const { roleString } = props

    const game: BoardGame<CommonBoardGameSettings, any> = GameManager.INSTANCE.game
    const player: Player = game.getPlayer(new Role(roleString))
    const settings: SettingMap<BoardGameSettings> = player.getSettings()

    const gameSettingControlArray: JSX.Element[] = []

    function handleValueChangeProvider(settingName: string) {
        return function(newValue: any): void {
            if (!!game.getSetting('synchronizePlayerSettings').value) {
                const roleArray = game.getRoleArray()
                for (const role of roleArray) {
                    const playerSetting = game.getPlayer(role).getSetting(settingName)
                    playerSetting.value = newValue
                }
            }
        }
    }

    for (const [settingName, setting] of Object.entries(settings)) {
        const gameSettingControl: JSX.Element = <GameSettingControl
            key={setting.getProperty('label')}
            setting={setting as BoardGameSetting<any>}
            onValueChange={handleValueChangeProvider(settingName)}
        />
        gameSettingControlArray.push(gameSettingControl)
    }

    return <SettingsSection title={`Player ${roleString} settings`}>
        {gameSettingControlArray}
    </SettingsSection>
}