import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    changeConfigMail
} from '../../../../../redux/projects/auth/edit/config/actions';

import {
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    RadioGroup,
    Radio
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

class MailConfiguration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, config, dispatchChangeConfigMail }: any = this.props;
        console.log(config.mail)
        return config.mail ? (
            <div className={classes.root}>
                <div className={classes.row}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={config.mail.enabled} 
                                onChange={(e) => {
                                    dispatchChangeConfigMail('enabled', e.target.checked);
                                }} 
                            />
                        }
                        label="Enable emailing."
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        fullWidth
                        autoComplete="email"
                        label="From Address"
                        variant="outlined"
                        color="secondary"
                        disabled={!config.mail.enabled}
                        value={config.mail.fromAddress}
                        onChange={(e) => {
                            dispatchChangeConfigMail('fromAddress', e.target.value);
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        How would users receive verification?
                    </Typography>
                </div>
                <div className={classes.row}>
                    <RadioGroup
                        value={config.mail.verificationType}
                        onChange={(e) => {
                            dispatchChangeConfigMail('verificationType', e.target.value);
                        }}
                    >
                        <FormControlLabel
                            disabled={!config.mail.enabled}
                            label="Link"
                            value="link"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            disabled={!config.mail.enabled}
                            label="Code"
                            value="code"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </div>
                <div className={classes.row}>
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        Account verification
                    </Typography>
                </div>
                <div className={classes.row}>
                    <TextField
                        fullWidth
                        label="Email Subject"
                        variant="outlined"
                        color="secondary"
                        disabled={!config.mail.enabled}
                        value={config.mail.verifySubject}
                        onChange={(e) => {
                            dispatchChangeConfigMail('verifySubject', e.target.value);
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Email Content"
                        variant="outlined"
                        color="secondary"
                        disabled={!config.mail.enabled}
                        value={config.mail.verifyContent}
                        onChange={(e) => {
                            dispatchChangeConfigMail('verifyContent', e.target.value);
                        }}
                        helperText="{__verify__} will be replaced with the link or code depending on which you choose."
                    />
                </div>
                <div className={classes.row}>
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        Reset password
                    </Typography>
                </div>
                <div className={classes.row}>
                    <TextField
                        fullWidth
                        label="Email Subject"
                        variant="outlined"
                        color="secondary"
                        disabled={!config.mail.enabled}
                        value={config.mail.resetSubject}
                        onChange={(e) => {
                            dispatchChangeConfigMail('resetSubject', e.target.value);
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Email Content"
                        variant="outlined"
                        color="secondary"
                        disabled={!config.mail.enabled}
                        value={config.mail.resetContent}
                        onChange={(e) => {
                            dispatchChangeConfigMail('resetContent', e.target.value);
                        }}
                        helperText="{__temporary password__} will be replaced with the temporary password."
                    />
                </div>
            </div>
        ) : <></>;
    }
}

const styles: any = (theme) => ({
    root: {
        padding: '10px 5px',
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        marginBottom: '10px'
    },
    subtitle: {
        fontWeight: '600'
    }
})

const mapStateToProps = (state) => {
    return {
        project: state.project,
        config: state.config.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchChangeConfigMail: (key: string, value: any) => dispatch(changeConfigMail(key, value))
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(MailConfiguration);