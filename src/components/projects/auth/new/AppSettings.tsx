import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    settingsSetValue
} from '../../../../redux/projects/auth/new/settings/actions';

import crypto from 'crypto';

import { makeStyles } from '@material-ui/core/styles';
import authenticationSettingStyles from '../../../../styles/projects/auth/new/components/authenticationSettingStyles';

import {
    Checkbox,
    FormControlLabel,
    TextField,
    RadioGroup,
    Radio,
    Button
} from '@material-ui/core';

type AppSettingsProps = {
    userSignUp: number,
    appSecret: string,
    sessionExpiresIn: {
        forever: boolean,
        days: number,
        minutes: number
    }
}

const AppSettings: FunctionComponent = () => {
    const classes = makeStyles(authenticationSettingStyles)();
    const settings: AppSettingsProps = useSelector(state => state.settings);
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <div className={classes.title}>Session Settings</div>
            <div className={classes.subTitle}>Configuration for your project</div>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <RadioGroup
                    value={settings.userSignUp}
                    onChange={(e) => {
                        console.log(e.target.value)
                        dispatch(settingsSetValue('userSignUp', parseInt(e.target.value)))
                    }}>
                        <FormControlLabel
                            label="Allow users to register"
                            value={0}
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Only allow administrators to make an account"
                            value={1}
                            control={<Radio />}
                        />
                    </RadioGroup>
                </li>
                {/* <li className={classes.listItemRowFull}>
                    <TextField
                        className={classes.listItemColumnFull}
                        label="API secret"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={settings.appSecret}
                        onChange={(e) => {
                            dispatch(settingsSetValue('appSecret', e.target.value))
                        }}
                    />
                </li>
                <li className={classes.listItemRowFull}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            const secret = crypto.randomBytes(16).toString('hex');
                            dispatch(settingsSetValue('appSecret', secret))
                        }}
                    >
                        Reroll secret
                    </Button>
                </li> */}
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
                            value={settings.sessionExpiresIn.days}
                            disabled={settings.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => {
                                dispatch(settingsSetValue('sessionExpiresIn', {
                                    ...settings.sessionExpiresIn,
                                    days: parseInt(e.target.value)
                                }));
                            }}
                        />
                    </div>
                    <div className={classes.listItemColumn}>
                        <TextField
                            className={classes.listItemColumnFull}
                            label="Minutes"
                            variant="outlined"
                            color="secondary"
                            type="number"
                            value={settings.sessionExpiresIn.minutes}
                            disabled={settings.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => {
                                dispatch(settingsSetValue('sessionExpiresIn', {
                                    ...settings.sessionExpiresIn,
                                    minutes: parseInt(e.target.value)
                                }));
                            }}
                        />
                    </div>
                </li>
                <li className={classes.listItemColumn}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={settings.sessionExpiresIn.forever} 
                                onChange={(e) => {
                                    dispatch(settingsSetValue('sessionExpiresIn', {
                                        ...settings.sessionExpiresIn,
                                        forever: e.target.checked
                                    }));
                                }}
                            />
                        }
                        label="Never"
                    />
                </li>
            </ul>
        </div>
    )
}


export default AppSettings;