import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    mailSetValue
} from '../../../../redux/projects/auth/new/mail/actions';

import {
    RadioGroup,
    Radio,
    FormControlLabel,
    Checkbox,
    TextField
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../styles/projects/auth/new/components/mailConfigStyles';

type MailSettingsProps = {
    enabled: boolean;
    fromAddress: string;
    verificationType: string;

    verifyContentType: string;
    verifySubject: string;
    verifyContent: string;

    resetContentType: string;
    resetSubject: string;
    resetContent: string;
}

const MailConfig: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const mail: MailSettingsProps = useSelector(state => state.mail);
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <div className={classes.title}>Mail Configuration</div>
            <div className={classes.subTitle}>Customise your emails for verification and resetting</div>
            
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <FormControlLabel
                        label="Enable emailing for this app."
                        control={
                            <Checkbox 
                                checked={mail.enabled}
                                onChange={(e) => {
                                    dispatch(mailSetValue('enabled', e.target.checked));
                                }}
                            />
                        }
                    />
                </li>
                <li className={classes.listItem}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        placeholder="John Doe <john.doe@domain.com>"
                        label="FROM email address"
                        fullWidth
                        value={mail.fromAddress}
                        disabled={!mail.enabled}
                        onChange={(e) => {
                            dispatch(mailSetValue('fromAddress', e.target.value));
                        }}
                    />
                </li>
                <li className={classes.listItem}>
                    <div className={classes.listItemHeader}>How would users receive verification?</div>
                    <RadioGroup
                        value={mail.verificationType}
                        onChange={(e) => {
                            dispatch(mailSetValue('verificationType', e.target.value));
                        }}
                    >
                        <FormControlLabel
                            disabled={!mail.enabled}
                            label="Link"
                            value="link"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            disabled={!mail.enabled}
                            label="Code"
                            value="code"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </li>
                <div className={classes.listItemHeader}>Account verification</div>
                <li className={classes.listItem}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Email subject"
                        fullWidth
                        value={mail.verifySubject}
                        disabled={!mail.enabled}
                        onChange={(e) => {
                            dispatch(mailSetValue('verifySubject', e.target.value));
                        }}
                    />
                </li>
                <li className={classes.listItem}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Email content"
                        helperText="{__verify__} will be replaced with the link or code depending on which you choose."
                        fullWidth
                        multiline
                        rowsMax={50}
                        value={mail.verifyContent}
                        disabled={!mail.enabled}
                        onChange={(e) => {
                            dispatch(mailSetValue('verifyContent', e.target.value));
                        }}
                    />
                </li>
                <div className={classes.listItemHeader}>Reset account password</div>
                <li className={classes.listItem}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Email subject"
                        fullWidth
                        value={mail.resetSubject}
                        disabled={!mail.enabled}
                        onChange={(e) => {
                            dispatch(mailSetValue('resetSubject', e.target.value));
                        }}
                    />
                </li>
                <li className={classes.listItem}>
                    <TextField
                        color="secondary"
                        variant="outlined"
                        label="Email content"
                        helperText="{__temporary password__} will be replaced with the temporary password."
                        fullWidth
                        multiline
                        rowsMax={50}
                        value={mail.resetContent}
                        disabled={!mail.enabled}
                        onChange={(e) => {
                            dispatch(mailSetValue('resetContent', e.target.value));
                        }}
                    />
                </li>
            </ul>
        </div>
    )
}

export const checkMailConfiguration = (mail: MailSettingsProps) => {
    const errors: string[] = [];
    if (mail.enabled) {
        if (mail.fromAddress === '') {
            errors.push('From address required.');
        }
        if (!mail.verifyContent.includes('{__verify__}')) {
            errors.push('Verify email content requires {__verify__}');
        }
        if (!mail.resetContent.includes('{__temporary password__}')) {
            errors.push('Reset email content requires {__temporary password__}')
        }
    }
    const uniqueErrors: string[] = [...new Set(errors)]
    return uniqueErrors;
}

export default MailConfig;