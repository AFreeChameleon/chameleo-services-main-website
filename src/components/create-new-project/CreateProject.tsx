import { FunctionComponent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import createProjectStyles from '../../styles/create-new-project/components/createProjectStyles';
import attributeTableStyles, { tableTheme, errorTheme } from '../../styles/create-new-project/components/attributeTableStyles';

import {
    Button,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio
} from '@material-ui/core';

import {
    ThemeProvider
} from '@material-ui/core/styles'

type CreateProjectProps = {
    state: any;
    setErrors: Function;
    setTab: Function;
}

const CreateProject: FunctionComponent<CreateProjectProps> = ({ state, setErrors, setTab }) => {
    const classes = makeStyles(createProjectStyles)();
    const table = state.attributeTable;
    const config = state.passwordConfig;
    const settings = state.authenticationSettings;
    const oauth = state.OAuth;
    const buildProject = (e) => {
        console.log(state);
        axios.post('http://localhost:8080/api/build-config', state, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            window.location.href = '#top';
            console.log(err.message);
            if (err.response.data) {
                setErrors([ err.response.data.message ]);
            } else {
                setErrors([ err.message ]);
            }
        })
    }

    console.log(settings.sessionExpiresIn.forever)

    return (
        <div className={classes.root}>
            <div className={classes.title}>Summary</div>
            <div className={classes.subTitle}>Review your app configuration</div>

            <div className={classes.title}>User Model</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => setTab(0)}
            >
                Go to user model
            </div>
            <div className={classes.table}>
                <div className={`${classes.row} ${classes.headers}`}>
                    <div className={`${classes.column} ${classes.header} ${classes.left}`}>Column Name</div>
                    <div className={`${classes.column} ${classes.header}`}>Unique</div>
                    <div className={`${classes.column} ${classes.header}`}>Required</div>
                    <div className={`${classes.column} ${classes.header} ${classes.left}`}>Default</div>
                    <div className={`${classes.column} ${classes.header} ${classes.left}`}>Type</div>
                    <div className={`${classes.column} ${classes.header}`}>Max. Length</div>
                    <div className={`${classes.column} ${classes.header}`}>Min. Length</div>
                </div>
                { table.map((row, i) => (
                    <div className={classes.row} key={i}>
                        <div className={`${classes.column} ${classes.left}`}>
                            {row.name}
                        </div>
                        <div className={classes.column}>
                            <Checkbox
                                checked={row.unique}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                            />
                        </div>
                        <div className={classes.column}>
                            <Checkbox
                                checked={row.required}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                            />
                        </div>
                        <div className={`${classes.column} ${classes.left}`}>
                            {!row.required ? row.default : ''}
                        </div>
                        <div className={`${classes.column} ${classes.left}`}>
                            {row.type}
                        </div>
                        <div className={classes.column}>
                            {row.max}
                        </div>
                        <div className={classes.column}>
                            {row.min}
                        </div>
                    </div>
                )) }
            </div>

            <div className={classes.title}>Password Requirements</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => setTab(1)}
            >
                Go to password requirements
            </div>

            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={config.upperCase}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
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
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
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
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
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
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                            />
                        }
                        label="Require special characters"
                    />
                </li>
            </ul>

            <div className={classes.title}>Session Settings</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => setTab(2)}
            >
                Go to session settings
            </div>

            <ul className={classes.list}>
                <li className={classes.listRow}>
                    <strong>
                        { settings.userSignUp === 0 ? 
                            "Allow user sign-ups" : 
                            "Only allow administrators to make an account"
                        }
                    </strong>
                </li>
                <li className={classes.listRow}>
                    <strong>Secret:</strong> {settings.appSecret}
                </li>
                <li className={classes.listRow}>
                    <strong>Session expires in:</strong>&nbsp;
                    { !settings.sessionExpiresIn.forever ? 
                        `${settings.sessionExpiresIn.days} days, ${settings.sessionExpiresIn.minutes}` :
                        'Never'
                    }
                </li>
            </ul>

            <div className={classes.title}>OAuth Settings</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => setTab(3)}
            >
                Go to OAuth settings
            </div>

            { oauth.google.clientID || oauth.google.clientKey || oauth.google.redirectURI ?
                (<ul className={classes.list}>
                    <li className={classes.listItem}>
                        <div className={classes.listItemHeader}>
                            <div className={classes.listItemHeaderText}>
                                Google
                            </div>
                        </div>
                        <ul className={classes.list}>
                            <li className={classes.listRow}>
                                <strong>Client ID: </strong>{oauth.google.clientID ? oauth.google.clientID : 'Missing'}
                            </li>
                            <li className={classes.listRow}>
                                <strong>Client Key: </strong>{oauth.google.clientKey ? oauth.google.clientKey : 'Missing'}
                            </li>
                            <li className={classes.listRow}>
                                <strong>Redirect URI: </strong>{oauth.google.redirectURI ? oauth.google.redirectURI : 'Missing'}
                            </li>
                        </ul>
                    </li>
                </ul>) : ''
            }

            <div className={classes.button}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={buildProject}
                >
                    Create New Project
                </Button>
            </div>
        </div>
    )
}

export default CreateProject;