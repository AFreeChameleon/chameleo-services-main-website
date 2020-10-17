import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import authenticationSettingStyles from '../../styles/create-new-project/components/authenticationSettingStyles';

import {
    Checkbox,
    FormControlLabel,
    TextField,
    RadioGroup,
    Radio
} from '@material-ui/core';

function AuthenticationSettings() {
    const classes = makeStyles(authenticationSettingStyles)();
    const [config, setConfig] = useState({
        userSignUp: 0,
        appID: 'lJHSFLKJDFDLFGjshfjlskdfdjfl',
        appSecret: 'lJHSFgdfgLKJDFhgDLFGjhhshfjlsadskdfdjfl',
        sessionExpiresIn: {
            forever: false,
            days: 30,
            minutes: 0
        }
    })
    return (
        <div className={classes.root}>
            <div className={classes.title}>Authentication Settings</div>
            <div className={classes.subTitle}>Configuration for your project</div>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <RadioGroup
                    value={config.userSignUp}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setConfig({
                            ...config,
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
                <li className={classes.listItemRow}>
                    <div className={classes.listItemColumn}>
                        App ID:
                    </div>
                    <div className={classes.listItemColumnRight}>
                        {config.appID}
                    </div>
                </li>
                <li className={classes.listItemRowFull}>
                    <TextField
                        className={classes.listItemColumnFull}
                        label="App secret"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={(e) => setConfig({
                            ...config,
                            appSecret: e.target.value
                        })}/>
                </li>
                <li className={classes.listItemRow}>
                    <div className={classes.listItemColumnFull}>
                        Session expires in:
                    </div>
                </li>
                <li className={classes.listItemColumn}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={config.sessionExpiresIn.forever} onChange={(e) => {
                                setConfig({
                                    ...config,
                                    sessionExpiresIn: {
                                        ...config.sessionExpiresIn,
                                        forever: e.target.checked
                                    }
                                })
                            }} />
                        }
                        label="Forever"
                    />
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
                            disabled={config.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => setConfig({
                                ...config,
                                sessionExpiresIn: {
                                    ...config.sessionExpiresIn,
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
                            disabled={config.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => setConfig({
                                ...config,
                                sessionExpiresIn: {
                                    ...config.sessionExpiresIn,
                                    minutes: parseInt(e.target.value)
                                }
                            })}/>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default AuthenticationSettings;