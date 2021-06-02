import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchConfig,
} from '../../../../redux/projects/auth/edit/config/actions';

import {
    Typography,
} from '@material-ui/core';
import ErrorList from './components/ErrorList';
import UserModelTable from './components/UserModelTable';
import PasswordRequirements from './components/PasswordRequirements';
import SessionSettings from './components/SessionSettings';
import MailConfiguration from './components/MailConfiguration';
import OAuthSetup from './components/OAuthSetup';
import EditButton from './components/EditButton';

import styles from '../../../../styles/projects/auth/edit/components/body';
import { withStyles } from '@material-ui/core/styles';

class EditAuthContainerBody extends React.Component {
    constructor(props) {
        super(props);
        const { project, dispatchFetchConfig }: any = this.props;
        dispatchFetchConfig(project.project_id);
    }

    render() {
        const { 
            classes, 
            config,
        }: any = this.props;

        return !config.loading && config.data !== {} &&(
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
                    <EditButton/>
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
        dispatchFetchConfig: (project_id: string) => dispatch(fetchConfig(project_id)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(EditAuthContainerBody) as React.ComponentType;