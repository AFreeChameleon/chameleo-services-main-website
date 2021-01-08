import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/auth/new/tabs/actions';
import { setErrors } from '../../../../redux/projects/auth/new/errors/actions';

import axios from 'axios';
import { useRouter } from 'next/router';
import { MAIN_URL } from '../../../../globals';
import { makeStyles } from '@material-ui/core/styles';
import createProjectStyles from '../../../../styles/projects/auth/new/components/createProjectStyles';

import { checkUserModel } from './UserModel';
import { checkMailConfiguration } from './MailConfig';

import {
    Button,
    Checkbox,
    FormControlLabel,
    TextField
} from '@material-ui/core';
import { Router } from '@material-ui/icons';

const CreateProject: FunctionComponent = () => {
    const classes = makeStyles(createProjectStyles)();
    const router = useRouter();
    const table = useSelector(state => state.model.table);
    const config = useSelector(state => state.password);
    const settings = useSelector(state => state.settings);
    const mail = useSelector(state => state.mail);
    const oauth = useSelector(state => state.oauth);
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();

    const buildProject = (e) => {
        const errors = {
            model: checkUserModel(table),
            mail: checkMailConfiguration(mail)
        }
        if (errors.model.length > 0) {
            dispatch(setErrors(errors.model));
        } else if (errors.mail.length > 0) {
            dispatch(setErrors(errors.mail));
        } else {
            axios.post(`${MAIN_URL}/api/projects/${project.project_id}/containers/auth/new`, {
                model: table,
                appSettings: settings,
                password: config,
                mail: mail,
                oauth: oauth
            }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                dispatch(setErrors([]));
                router.push(`/projects/${project.project_id}`)
            })
            .catch((err) => {
                window.location.href = '#top';
                console.log(err.message);
                if (err.response.data) {
                    dispatch(setErrors([ err.response.data.message ]));
                } else {
                    dispatch(setErrors([ err.message ]));
                }
            })
        }
        window.location.href = '#top';
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>Summary</div>
            <div className={classes.subTitle}>Review your app configuration</div>

            <div className={classes.title}>User Model</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => dispatch(setSelectedTab(0))}
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
                onClick={(e) => dispatch(setSelectedTab(1))}
            >
                Go to password requirements
            </div>

            <ul className={classes.listTextRow}>
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
                onClick={(e) => dispatch(setSelectedTab(2))}
            >
                Go to session settings
            </div>

            <ul className={classes.list}>
                <li className={classes.listTextRow}>
                    <strong>
                        { settings.userSignUp === 0 ? 
                            "Allow users to register" : 
                            "Only allow administrators to make an account"
                        }
                    </strong>
                </li>
                <li className={classes.listTextRow}>
                    <strong>Session expires in:</strong>&nbsp;
                    { !settings.sessionExpiresIn.forever ? 
                        `${settings.sessionExpiresIn.days} days, ${settings.sessionExpiresIn.minutes}` :
                        'Never'
                    }
                </li>
            </ul>

            <div className={classes.title}>Mail Configuration</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => dispatch(setSelectedTab(3))}
            >
                Go to mail configuration
            </div>

            { mail.enabled ? (
                <ul className={classes.listMail}>
                    <li className={classes.listMailRow}>
                        <strong>FROM email address:&nbsp;</strong> 
                            {mail.fromAddress ? mail.fromAddress : <span style={{color: 'red'}}>Missing</span>}
                    </li>
                    <li className={classes.listMailRow}>
                        <strong>Verification type:&nbsp;</strong> 
                            {mail.verificationType}
                    </li>
                    <li className={classes.listMailRowTitle}>
                        <strong>Account verification email</strong>
                    </li>
                    <li className={classes.listMailRow}>
                        <strong>Subject:&nbsp;</strong> 
                            { mail.verifySubject.length < 80 ? 
                                mail.verifySubject : 
                                mail.verifySubject.substring(0, 77) + '...'
                            }
                    </li>
                    <li className={classes.listMailRow}>
                        <div>
                            <strong>Content:&nbsp;</strong>
                        </div>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={mail.verifyContent}
                        />
                    </li>
                    <li className={classes.listMailRowTitle}>
                        <strong>Account password reset email</strong>
                    </li>
                    <li className={classes.listMailRow}>
                        <strong>Subject:&nbsp;</strong> 
                            { mail.resetSubject.length < 80 ? 
                                mail.resetSubject : 
                                mail.resetSubject.substring(0, 77) + '...'
                            }
                    </li>
                    <li className={classes.listMailRow}>
                        <div>
                            <strong>Content:&nbsp;</strong>
                        </div>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={mail.resetContent}
                        />
                    </li>
                </ul>
            ) : (
                <div className={classes.subTitle}>
                    E-mail disabled.
                </div>
            )}

            <div className={classes.title}>OAuth Settings</div>
            <div 
                className={classes.subTitleLink}
                onClick={(e) => dispatch(setSelectedTab(4))}
            >
                Go to OAuth settings
            </div>

            { oauth.google.clientID || oauth.google.clientKey || oauth.google.redirectURI ?
                (<ul className={classes.listTextRow}>
                    <li className={classes.listItem}>
                        <div className={classes.listItemHeader}>
                            <div className={classes.listItemHeaderText}>
                                Google
                            </div>
                        </div>
                        <ul className={classes.listTextRow}>
                            <li className={classes.listRow}>
                                <strong>Client ID: </strong>{oauth.google.clientID ? oauth.google.clientID : 'Missing'}
                            </li>
                            <li className={classes.listRow}>
                                <strong>Client Secret: </strong>{oauth.google.clientSecret ? oauth.google.clientSecret : 'Missing'}
                            </li>
                            <li className={classes.listRow}>
                                <strong>Redirect URI: </strong>{oauth.google.redirectURI ? oauth.google.redirectURI : 'Missing'}
                            </li>
                        </ul>
                    </li>
                </ul>) : (
                    <div className={classes.subTitle}>
                        No OAuth configured.
                    </div>
                )
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