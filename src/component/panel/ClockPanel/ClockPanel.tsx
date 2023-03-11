import { Panel, PanelProps } from '../../Panel';
import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { ClockDisplay } from './ClockDisplay';
import { Role } from '../../../logic/Role';
import './ClockPanel.css';
import { Game } from '../../../logic/Game';
import { GameController } from '../../../logic/GameController';

export type ClockPanelProps = PanelProps & {};

export const ClockPanel: FunctionComponent<ClockPanelProps> = ({ isShow }) => {
    const onClickSectionProvider = (role: Role) => {
        return () => {
            const game: Game = GameController.INSTANCE.getGame();
            game.getPlayer(role);

            console.log(role);
        };
    };

    return <Panel className='ClockPanel' isShow={isShow}>
        <Box className='ClockPanelSection' onClick={onClickSectionProvider(Role.A)}>
            <ClockDisplay playerRole={Role.A} overturn />
        </Box>
        <Box className='ClockPanelRibbon'></Box>
        <Box className='ClockPanelSection' onClick={onClickSectionProvider(Role.B)}>
            <ClockDisplay playerRole={Role.B} />
        </Box>
    </Panel>;
};