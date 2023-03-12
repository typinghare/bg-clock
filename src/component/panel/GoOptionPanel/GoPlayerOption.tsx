import { FunctionComponent } from 'react';
import { Box, Grid } from '@mui/material';
import { BasicSelect, BasicSelectChangeHandler } from '../../select/BasicSelect';
import { toNumber } from 'lodash';
import { Time } from '../../../common/Time';
import { Game } from '../../../logic/Game';
import { GameController } from '../../../logic/GameController';
import { Role } from '../../../logic/Role';
import { GoGameOptions, goOptionsDefaultValues, goOptionsMaps, GoPlayerOptions } from '../../../logic/game/go/GoGame';

export type GoPlayerOptionProps = {
    role?: Role
}

/**
 * @component
 */
export const GoPlayerOption: FunctionComponent<GoPlayerOptionProps> = ({ role }) => {
    const mainTimeMap = goOptionsMaps.mainTime;
    const mainTimeItemList = Object.keys(mainTimeMap);
    const mainTimeValueList = Object.values(mainTimeMap);

    const timePerPeriodMap = goOptionsMaps.timePerPeriod;
    const timePerPeriodItemList = Object.keys(timePerPeriodMap);
    const timePerPeriodValueList = Object.values(timePerPeriodMap);

    const periodsMap = goOptionsMaps.periods;
    const periodItemList = Object.keys(periodsMap);
    const periodValueList = Object.values(periodsMap);

    const mainTimeHandleChange: BasicSelectChangeHandler = (event) => {
        const value: number = toNumber(event.target.value);

        if (value >= 0 && value < mainTimeItemList.length) {
            const time: Time = mainTimeValueList[value];
            const game: Game<GoGameOptions, GoPlayerOptions> = GameController.INSTANCE.getGame();

            if (role) {
                game.getPlayer(role).setOption('mainTime', time.clone());
            } else {
                [Role.A, Role.B].forEach(role => {
                    game.getPlayer(role).setOption('mainTime', time.clone());
                });
            }
        }
    };

    const timePerPeriodHandleChange: BasicSelectChangeHandler = (event) => {
        const value: number = toNumber(event.target.value);

        if (value >= 0 && value < timePerPeriodItemList.length) {
            const time: Time = timePerPeriodValueList[value];
            const game: Game<GoGameOptions, GoPlayerOptions> = GameController.INSTANCE.getGame();
            if (role) {
                game.getPlayer(role).setOption('timePerPeriod', time.clone());
            } else {
                [Role.A, Role.B].forEach(role => {
                    game.getPlayer(role).setOption('timePerPeriod', time.clone());
                });
            }
        }
    };

    const periodsHandleChange: BasicSelectChangeHandler = (event) => {
        const value: number = toNumber(event.target.value);
        if (value < periodItemList.length) {
            const game: Game<GoGameOptions, GoPlayerOptions> = GameController.INSTANCE.getGame();
            if (role) {
                game.getPlayer(role).setOption('periods', periodValueList[value]);
            } else {
                [Role.A, Role.B].forEach(role => {
                    game.getPlayer(role).setOption('periods', periodValueList[value]);
                });
            }
        }
    };

    return <Box>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <BasicSelect
                    label={'Main Time'}
                    itemList={mainTimeItemList}
                    defaultValue={goOptionsDefaultValues.mainTime}
                    handleChange={mainTimeHandleChange}
                ></BasicSelect>
            </Grid>
            <Grid item xs={4}>
                <BasicSelect
                    label={'Time Per Period'}
                    itemList={timePerPeriodItemList}
                    defaultValue={goOptionsDefaultValues.timePerPeriod}
                    handleChange={timePerPeriodHandleChange}
                ></BasicSelect>
            </Grid>
            <Grid item xs={4}>
                <BasicSelect
                    label={'Periods'}
                    itemList={periodItemList}
                    defaultValue={goOptionsDefaultValues.periods}
                    handleChange={periodsHandleChange}
                ></BasicSelect>
            </Grid>
        </Grid>
    </Box>;
};