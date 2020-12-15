import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    setProjectValue
} from '../../../../redux/projects/auth/edit/project/actions';
import {
    fetchConfig,
    changeConfigModel,
    changeConfigAuth,
    changeConfigDB,
    changeConfigPass,
    changeConfigModelLength,
    removeConfigModelRow,
    changeConfigModelTitle,
    addConfigModelRow
} from '../../../../redux/projects/auth/edit/config/actions';

import {
    Typography,
    Checkbox,
    Select,
    MenuItem,
    InputBase,
    Button,
    IconButton,
    FormControlLabel
} from '@material-ui/core';
import UserModelTable from './components/UserModelTable';
import PasswordRequirements from './components/PasswordRequirements';
import SessionSettings from './components/SessionSettings';
import MailConfiguration from './components/MailConfiguration';
import OAuthSetup from './components/OAuthSetup';
import EditButton from './components/EditButton';

import styles from '../../../../styles/projects/auth/edit/components/body';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

class EditAuthContainerBody extends React.Component {
    constructor(props) {
        super(props);
        const { project, dispatchFetchConfig }: any = this.props;
        dispatchFetchConfig(project.project_id);
    }

    render() {
        const { 
            classes, 
            configObj, 
            project,
            dispatchChangeConfigModel,
            dispatchChangeConfigModelLength,
            dispatchRemoveConfigModelRow,
            dispatchChangeConfigModelTitle,
            dispatchAddConfigModelRow
        }: any = this.props;
        const config = configObj.data;
        console.log(this.props);

        return !configObj.loading && configObj.data !== {} &&(
            <div className={classes.root}>
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
        configObj: state.config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchConfig: (project_id: string) => dispatch(fetchConfig(project_id)),
        dispatchSetProjectValue: (key: string, value) => dispatch(setProjectValue(key, value)),
        dispatchChangeConfigModel: (rowName: string, key: string, value) => dispatch(changeConfigModel(rowName, key, value)),
        dispatchChangeConfigAuth: (key: string, value) => dispatch(changeConfigAuth(key, value)),
        dispatchChangeConfigDB: (key: string, value) => dispatch(changeConfigDB(key, value)),
        dispatchChangeConfigPass: (key: string, value) => dispatch(changeConfigPass(key, value)),
        dispatchChangeConfigModelLength: (modelKey: string, key: string, value) => dispatch(changeConfigModelLength(modelKey, key, value)),
        dispatchRemoveConfigModelRow: (rowName: string) => dispatch(removeConfigModelRow(rowName)),
        dispatchChangeConfigModelTitle: (oldName: string, newName: string) => dispatch(changeConfigModelTitle(oldName, newName)),
        dispatchAddConfigModelRow: () => dispatch(addConfigModelRow())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(EditAuthContainerBody);