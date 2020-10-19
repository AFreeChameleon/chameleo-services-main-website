import { FunctionComponent, useState } from 'react';
import { AuthSettings, Error } from '../../types';
import crypto from 'crypto';

import { makeStyles } from '@material-ui/core/styles';
import authenticationSettingStyles from '../../styles/create-new-project/components/authenticationSettingStyles';

import {
    Checkbox,
    FormControlLabel,
    TextField,
    RadioGroup,
    Radio,
    Button
} from '@material-ui/core';

type AuthenticationSettingsProps = {
    settings: AuthSettings,
    setSettings: (settings: AuthSettings) => void;
    pushError: (error: string) => void;
    removeError: (id: string) => void;
}

const AuthenticationSettings: FunctionComponent<AuthenticationSettingsProps> = ({ settings, setSettings, pushError, removeError }) => {
    const classes = makeStyles(authenticationSettingStyles)();
    const regex = {
        secret: /^[\w]{16,}$/
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>Authentication Settings</div>
            <div className={classes.subTitle}>Configuration for your project</div>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <RadioGroup
                    value={settings.userSignUp}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setSettings({
                            ...settings,
                            userSignUp: parseInt(e.target.value)
                        })
                    }}>
                        <FormControlLabel
                            label="Allow user sign-ups"
                            value={0}
                            control={<Radio />}/>
                        <FormControlLabel
                            label="Only allow administrators to make an account"
                            value={1}
                            control={<Radio />}/>
                    </RadioGroup>
                </li>
                <li className={classes.listItemRowFull}>
                    <TextField
                        className={classes.listItemColumnFull}
                        label="API secret"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        defaultValue={settings.appSecret}
                        onBlur={(e) => {
                            if (!regex.secret.test(e.target.value)) {
                                pushError('Secret must contain more than 16 characters.')
                            } else {
                                removeError('Secret must contain more than 16 characters.');
                            }
                            setSettings({
                                ...settings,
                                appSecret: e.target.value
                            })
                        }}/>
                </li>
                <li className={classes.listItemRowFull}>
                    <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={(e) => setSettings({
                        ...settings,
                        appSecret: crypto.randomBytes(16).toString('hex')
                    })}>
                        Reroll secret
                    </Button>
                </li>
                <li className={classes.listItemRow}>
                    <div className={classes.listItemColumnFull}>
                        Session expires in:
                    </div>
                </li>
                <li className={classes.listItemRow}>
                    <div className={classes.listItemColumn}>
                        <TextField
                            className={classes.listItemColumnFull}
                            label="Days"
                            variant="outlined"
                            color="secondary"
                            type="number"
                            defaultValue={'30'}
                            disabled={settings.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => setSettings({
                                ...settings,
                                sessionExpiresIn: {
                                    ...settings.sessionExpiresIn,
                                    days: parseInt(e.target.value)
                                }
                            })}/>
                    </div>
                    <div className={classes.listItemColumn}>
                        <TextField
                            className={classes.listItemColumnFull}
                            label="Minutes"
                            variant="outlined"
                            color="secondary"
                            type="number"
                            defaultValue={'0'}
                            disabled={settings.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => setSettings({
                                ...settings,
                                sessionExpiresIn: {
                                    ...settings.sessionExpiresIn,
                                    minutes: parseInt(e.target.value)
                                }
                            })}/>
                    </div>
                </li>
                <li className={classes.listItemColumn}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={settings.sessionExpiresIn.forever} onChange={(e) => {
                                setSettings({
                                    ...settings,
                                    sessionExpiresIn: {
                                        ...settings.sessionExpiresIn,
                                        forever: e.target.checked
                                    }
                                })
                            }} />
                        }
                        label="Never"
                    />
                </li>
            </ul>
        </div>
    )
}

export default AuthenticationSettings;