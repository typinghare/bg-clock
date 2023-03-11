import { FunctionComponent } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { OptionAccordion } from '../../OptionAccordion';
import { GoPlayerOption } from './GoPlayerOption';
import { Role } from '../../../logic/Role';
import { Box, Button } from '@mui/material';
import { Panel, PanelProps } from '../../Panel';

export type GoOptionPanelProps = PanelProps & {}

/**
 * @component Go option panel.
 */
export const GoOptionPanel: FunctionComponent<GoOptionPanelProps> = ({ isShow }) => {
    const dispatch = useAppDispatch();
    const onClickStartGame = () => {
        console.log('click start game');
    };

    return <Panel isShow={isShow} sx={{ padding: '1em' }}>
        <OptionAccordion summaryId={'GoOptionBlackAccordion'} title={'BLACK OPTIONS'} expanded={true}>
            <GoPlayerOption role={Role.A} />
        </OptionAccordion>

        <OptionAccordion summaryId={'GoOptionWhiteAccordion'} title={'WHITE OPTIONS'} expanded={true}>
            <GoPlayerOption role={Role.B} />
        </OptionAccordion>

        <OptionAccordion summaryId={'GoOptionAdvancedAccordion'} title={'ADVANCED SETTINGS'} expanded={false}>
            Nothing here ...
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