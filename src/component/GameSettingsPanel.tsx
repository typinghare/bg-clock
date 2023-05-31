import React, { useState } from 'react'
import { Panel, PanelProps } from './Panel'
import { AnyGame, GameSupplierMap } from '@typinghare/board-game-clock-core'
import { useAppSelector } from '../redux/hooks'
import { GameType, selectGameType } from '../redux/slice/GameSlice'
import { GameSupplierMaps, GameTimeControls } from '../common/games'
import { GameSettingsSection } from './GameSettingsSection'

export type GameSettingsPanelProps = PanelProps & {}

export const GameSettingsPanel: React.FC<GameSettingsPanelProps> = function(props): JSX.Element {
    const { isShow, ...otherProps } = props
    const gametype: GameType = useAppSelector(selectGameType)
    const [timeControlName, setTimeControlName] = useState(GameTimeControls[gametype][0])
    const gameSupplierMap: GameSupplierMap<any> = GameSupplierMaps[gametype]
    const game: AnyGame = gameSupplierMap[timeControlName]()

    function handleTimeControlChange(newTimeControlName: string): void {
        setTimeControlName(newTimeControlName)
    }

    const style: React.CSSProperties = {
        padding: '1.5em 1em 1em 1em',
        backgroundColor: '#dcdcdd'
    }

    return <Panel isShow={isShow} sx={style} {...otherProps}>
        <GameSettingsSection game={game} gametype={gametype} onTimeChangeControl={handleTimeControlChange} />
    </Panel>
}

