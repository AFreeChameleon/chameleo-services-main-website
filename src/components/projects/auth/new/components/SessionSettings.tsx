import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    changeConfigAuth,
} from '../../../../../redux/projects/auth/new/config/actions';

import {
    Typography,
    Checkbox,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core';
import {
    NumberInputNoTicks
} from './inputs';
import { withStyles } from '@material-ui/core/styles';

class SessionSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, config, dispatchChangeConfigAuth }: any = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.row}>
                    <RadioGroup
                        value={config.auth.userSignUp}
                        onChange={(e) => {
                            dispatchChangeConfigAuth('userSignUp', (e.target.value === 'true'))
                        }}
                    >
                        <FormControlLabel
                            label="Allow users to register"
                            value={true}
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Only allow administrators to make an account"
                            value={false}
                            control={<Radio />}
                        />
                    </RadioGroup>
                </div>
                <div className={classes.row}>
                    <Typography
                        variant="body1"
                    >
                        Session expires in:
                    </Typography>
                </div>
                <div className={classes.rowFlex}>
                    <div className={classes.column}>
                        <NumberInputNoTicks
                            className={classes.listItemColumnFull}
                            label="Days"
                            variant="outlined"
                            color="secondary"
                            type="number"
                            value={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.days}
                            disabled={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => {
                                dispatchChangeConfigAuth('sessionExpiresIn', {
                                    ...config.auth.sessionExpiresIn,
                                    days: parseInt(e.target.value)
                                });
                            }}
                        />
                    </div>
                    <div className={classes.column}>
                        <NumberInputNoTicks
                            className={classes.listItemColumnFull}
                            label="Hours"
                            variant="outlined"
                            color="secondary"
                            type="number"
                            value={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.hours}
                            disabled={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                            fullWidth
                            onChange={(e) => {
                                dispatchChangeConfigAuth('sessionExpiresIn', {
                                    ...config.auth.sessionExpiresIn,
                                    hours: parseInt(e.target.value)
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={classes.row}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                                onChange={(e) => {
                                    dispatchChangeConfigAuth('sessionExpiresIn', {
                                        ...config.auth.sessionExpiresIn,
                                        forever: e.target.checked
                                    });
                                }}
                            />
                        }
                        label="Never"
                    />
                </div>
            </div>
        )
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
    rowFlex: {
        display: 'flex',
        gridColumnGap: '10px',
        marginBottom: '10px'
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
        dispatchChangeConfigAuth: (key: string, value) => dispatch(changeConfigAuth(key, value)),
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SessionSettings);