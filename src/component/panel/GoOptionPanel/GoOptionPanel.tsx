import * as React from 'react';
import { FunctionComponent } from 'react';
import { OptionAccordion } from '../../OptionAccordion';
import { GoPlayerOption } from './GoPlayerOption';
import { Role } from '../../../logic/Role';
import { Box, Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Panel, PanelProps } from '../../Panel';
import { Game } from '../../../logic/Game';
import { GameController } from '../../../logic/GameController';
import { useAppDispatch } from '../../../redux/hooks';
import { changePanel, PanelEnum } from '../../../redux/slice/PanelSlice';
import { FullScreen } from '../../../common/FullScreen';

export type GoOptionPanelProps = PanelProps & {}

/**
 * @component Go option panel.
 */
export const GoOptionPanel: FunctionComponent<GoOptionPanelProps> = ({ isShow }) => {
    const dispatch = useAppDispatch();
    const onClickStartGame = () => {
        const game: Game = GameController.INSTANCE.getGame();
        game.start(() => {
            console.log('Game End Callback.');
        });

        try {
            const fullScreen = new FullScreen(document.getElementById('GoOptionPanel'));
            fullScreen.start();
        } catch (e) {
            console.log(e);
        }

        dispatch(changePanel(PanelEnum.CLOCK_PANEL));
    };


    const [synchronizedPlayerOptions, setSynchronizedPlayerOptions] = React.useState(true);
    const SynchronizeSwitch = () => {
        const handleSynchronizeSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSynchronizedPlayerOptions(event.target.checked);
        };

        return <Switch
            defaultChecked={synchronizedPlayerOptions}
            onChange={handleSynchronizeSwitchChange}
        />;
    };

    return <Panel isShow={isShow} sx={{ padding: '1em' }} id='GoOptionPanel'>
        <h1>Game Options</h1>

        <Box hidden={synchronizedPlayerOptions}>
            <OptionAccordion summaryId={'GoOptionBlackAccordion'} title={'OPTIONS (BLACK)'} expanded={true}>
                <GoPlayerOption role={Role.A} />
            </OptionAccordion>

            <OptionAccordion summaryId={'GoOptionWhiteAccordion'} title={'OPTIONS (WHITE)'} expanded={true}>
                <GoPlayerOption role={Role.B} />
            </OptionAccordion>
        </Box>

        <Box hidden={!synchronizedPlayerOptions}>
            <OptionAccordion summaryId={'GoOptionBlackAccordion'} title={'OPTIONS'} expanded={true}>
                <GoPlayerOption />
            </OptionAccordion>
        </Box>

        <OptionAccordion summaryId={'GoOptionAdvancedAccordion'} title={'ADVANCED GAME OPTIONS'} expanded={false}>
            <FormGroup>
                <FormControlLabel control={<SynchronizeSwitch />} label="To synchronize player's options." />
            </FormGroup>
        </OptionAccordion>

        <Box sx={{ textAlign: 'center', marginTop: '3em' }}>
            <Button
                variant='contained'
                color='success'
                sx={{ fontSize: '1.5em', width: '60%' }}
                onClick={onClickStartGame}
            >Start Game</Button>
        </Box>
    </Panel>;
};
