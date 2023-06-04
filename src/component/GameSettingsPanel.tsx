import React, { useState } from 'react'
import { Panel, PanelProps } from './Panel'
import { useAppSelector } from '../redux/hooks'
import { selectGameType } from '../redux/slice/GameSlice'
import { GameSettingsSection } from './GameSettingsSection'
import {
    Game,
    GameSupplier,
    StandardGameContainer,
    StandardGameHolder,
    StandardGameType,
    TimeControlType,
} from '@typinghare/board-game-clock-core'


export const GameSettingsPanel: React.FC<PanelProps> = function(props): JSX.Element {
    const { isDisplay } = props

    // Retrieve game type from redux.
    const gameType: StandardGameType = useAppSelector(selectGameType)

    // Get time controls.
    const standardGameContainer = new StandardGameContainer()
    const timeControlTypeArray: TimeControlType[] = standardGameContainer.getTimeControls(gameType)

    // Create time control state and create a corresponding game.
    const [timeControlType, setTimeControlType] = useState<TimeControlType>(timeControlTypeArray[0])
    const gameSupplier: GameSupplier = standardGameContainer.getGameSupplier(gameType, timeControlType as never)
    const game = gameSupplier() as Game

    // Create a game holder.
    const gameHolder = new StandardGameHolder(gameType, timeControlType, game)

    function handleTimeControlChange(newTimeControlType: TimeControlType): void {
        setTimeControlType(newTimeControlType)
    }

    const style = {
        padding: '1.5em 0 1em 1em',
        backgroundColor: '#dcdcdd',
        overflowY: 'scroll',
    }

    return <Panel isDisplay={isDisplay} sx={style}>
        <GameSettingsSection
            gameHolder={gameHolder}
            onTimeChangeControl={handleTimeControlChange}
        />
    </Panel>
}