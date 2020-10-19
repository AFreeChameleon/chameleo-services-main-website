import { FunctionComponent, useState } from 'react';
import { PassConfig, Error } from '../../types';

import { makeStyles } from '@material-ui/core/styles';
import passwordConfigStyles from '../../styles/create-new-project/components/passwordConfigStyles';

import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

type PasswordConfigProps = {
    config: PassConfig,
    setConfig: (config: PassConfig) => void;
}

const PasswordConfig: FunctionComponent<PasswordConfigProps> = ({ config, setConfig }) => {
    const classes = makeStyles(passwordConfigStyles)();
    return (
        <div className={classes.root}>
            <div className={classes.title}>Password Configuration</div>
            <div className={classes.subTitle}>Passwords must contain:</div>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={config.upperCase} onChange={(e) => {
                                setConfig({
                                    ...config,
                                    upperCase: e.target.checked
                                })
                            }} />
                        }
                        label="Uppercase letters"
                    />
                </li>
                <li className={classes.listItem}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={config.lowerCase} onChange={(e) => {
                                setConfig({
                                    ...config,
                                    lowerCase: e.target.checked
                                })
                            }} />
                        }
                        label="Lowercase letters"
                    />
                </li>
                <li className={classes.listItem}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={config.requireNumbers} onChange={(e) => {
                                setConfig({
                                    ...config,
                                    requireNumbers: e.target.checked
                                })
                            }} />
                        }
                        label="Require numbers"
                    />
                </li>
                <li className={classes.listItem}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={config.requireSpecialChars} onChange={(e) => {
                                setConfig({
                                    ...config,
                                    requireSpecialChars: e.target.checked
                                })
                            }} />
                        }
                        label="Require special characters"
                    />
                </li>
            </ul>
        </div>
    )
}

export default PasswordConfig;