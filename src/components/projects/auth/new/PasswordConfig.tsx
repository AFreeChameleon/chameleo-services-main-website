import { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    passwordSetValue
} from '../../../../redux/projects/auth/new/password/actions';

import { makeStyles } from '@material-ui/core/styles';
import passwordConfigStyles from '../../../../styles/projects/auth/new/components/passwordConfigStyles';

import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

type PassConfigProps = {
    upperCase: boolean,
    lowerCase: boolean,
    requireNumbers: boolean,
    requireSpecialChars: boolean,
}

const PasswordConfig: FunctionComponent = () => {
    const classes = makeStyles(passwordConfigStyles)();
    const config: PassConfigProps = useSelector(state => state.password);
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <div className={classes.title}>Password Requirements</div>
            <div className={classes.subTitle}>Passwords must contain:</div>
            <div className={classes.alignCenter}>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={config.upperCase} 
                                    onChange={(e) => {
                                        dispatch(passwordSetValue('upperCase', e.target.checked));
                                    }} 
                                />
                            }
                            label="Uppercase letters"
                        />
                    </li>
                    <li className={classes.listItem}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={config.lowerCase} 
                                    onChange={(e) => {
                                        dispatch(passwordSetValue('lowerCase', e.target.checked));
                                    }} 
                                />
                            }
                            label="Lowercase letters"
                        />
                    </li>
                    <li className={classes.listItem}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={config.requireNumbers}
                                    onChange={(e) => {
                                        dispatch(passwordSetValue('requireNumbers', e.target.checked));
                                    }} 
                                />
                            }
                            label="Require numbers"
                        />
                    </li>
                    <li className={classes.listItem}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={config.requireSpecialChars}
                                    onChange={(e) => {
                                        dispatch(passwordSetValue('requireSpecialChars', e.target.checked));
                                    }} 
                                />
                            }
                            label="Require special characters"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PasswordConfig;