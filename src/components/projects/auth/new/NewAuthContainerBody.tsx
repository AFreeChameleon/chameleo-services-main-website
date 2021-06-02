import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ErrorList from './components/ErrorList';
import UserModelTable from './components/UserModelTable';
import PasswordRequirements from './components/PasswordRequirements';
import SessionSettings from './components/SessionSettings';
import MailConfiguration from './components/MailConfiguration';
import OAuthSetup from './components/OAuthSetup';
import NewButton from './components/NewButton';

import styles from '../../../../styles/projects/auth/edit/components/body';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
} from '@material-ui/core';

class NewAuthContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, config }: any = this.props;
        console.log(config);
        return (
            <div className={classes.root} id="top">
                <ErrorList/>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            User Model
                        </Typography>
                        <hr/>
                    </div>
                    <UserModelTable/>
                </div>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            Password
                        </Typography>
                        <hr/>
                    </div>
                    <PasswordRequirements/>
                </div>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            Session
                        </Typography>
                        <hr/>
                    </div>
                    <SessionSettings/>
                </div>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            Mail Configuration
                        </Typography>
                        <hr/>
                    </div>
                    <MailConfiguration/>
                </div>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            OAuth Setup
                        </Typography>
                        <hr/>
                    </div>
                    <OAuthSetup/>
                </div>
                <div className={classes.container}>
                    <NewButton/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
        config: state.config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(NewAuthContainer) as React.ComponentType;