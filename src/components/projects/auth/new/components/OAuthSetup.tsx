import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    changeConfigAuthOAuth,
    setConfigOAuthEnabled
} from '../../../../../redux/projects/auth/new/config/actions';

import {
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Collapse
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class OAuthSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            droppedDown: false
        }
    }

    render() {
        const { classes, config, dispatchChangeConfigAuthOAuth, dispatchSetConfigOAuthEnabled }: any = this.props;
        const { droppedDown }: any = this.state;

        return config.auth.oauth ? (
            <div className={classes.root}>
                <div>
                    <FormControlLabel
                        label="Enable OAuth"
                        control={<Checkbox
                            checked={config.auth.oauth.enabled}
                            onChange={(e) => dispatchSetConfigOAuthEnabled(e.target.checked)}
                        />}
                    />
                </div>
                <div 
                    className={classes.rowTitle}
                    onClick={(e) => config.auth.oauth.enabled && this.setState({ droppedDown: !droppedDown })}
                >
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        Google
                    </Typography>
                    <ArrowDropDownIcon className={`${classes.arrowDown} ${droppedDown && classes.arrowDownOpen}`}/>
                </div>
                <Collapse
                    in={config.auth.oauth.enabled ? droppedDown : false}
                >
                    <div className={classes.row}>
                        <TextField
                            fullWidth
                            label="Client ID"
                            variant="outlined"
                            color="secondary"
                            value={config.auth.oauth.google.clientID}
                            onChange={(e) => {
                                dispatchChangeConfigAuthOAuth('google', 'clientID', e.target.value);
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            fullWidth
                            label="Client Secret"
                            variant="outlined"
                            color="secondary"
                            value={config.auth.oauth.google.clientSecret}
                            onChange={(e) => {
                                dispatchChangeConfigAuthOAuth('google', 'clientSecret', e.target.value);
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            fullWidth
                            label="Redirect URI"
                            variant="outlined"
                            color="secondary"
                            value={config.auth.oauth.google.redirectURI}
                            onChange={(e) => {
                                dispatchChangeConfigAuthOAuth('google', 'redirectURI', e.target.value);
                            }}
                        />
                    </div>
                </Collapse>
            </div>
        ) : <></>
    }
}

const styles: any = (theme) => ({
    root: {
        padding: '10px 0',
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        marginBottom: '10px'
    },
    rowTitle: {
        marginBottom: '10px',
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 0',
        cursor: 'pointer'
    },
    subtitle: {
        fontWeight: '600',
    },
    arrowDown: {
        transform: 'rotate(0deg)',
        transition: 'transform 0.2s linear'
    },
    arrowDownOpen: {
        transform: 'rotate(180deg)',
        transition: 'transform 0.2s linear'
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
        dispatchChangeConfigAuthOAuth: (company: string, key: string, value: any) => dispatch(changeConfigAuthOAuth(company, key, value)),
        dispatchSetConfigOAuthEnabled: (value: boolean) => dispatch(setConfigOAuthEnabled(value))
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(OAuthSetup);