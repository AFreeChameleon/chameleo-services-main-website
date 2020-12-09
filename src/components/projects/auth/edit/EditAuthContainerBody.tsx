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
    changeConfigModelLength
} from '../../../../redux/projects/auth/edit/config/actions';

import {
    Typography,
    Checkbox,
    Select,
    MenuItem,
    InputBase,
    Button
} from '@material-ui/core';

import styles from '../../../../styles/projects/auth/edit/components/body';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';

const StyledCheckbox = withStyles({
    root: {
        padding: '5px'
    }
})(Checkbox);

const StyledSelect = withStyles({
    root: {
        '& fieldset': {
            border: 'none'
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: '#ffffff'
        }
    },
})(InputBase);

const RedButton = withStyles({
    root: {
        '&:hover': {
            backgroundColor: 'rgb(255, 0, 0, 0.05)'
        },
        '& .MuiButton-label': {
            color: 'red'
        }
    }
})(Button);

const ErrorButton = () => (
    <RedButton
        onClick={(e) => {
        }}
    >
        <RemoveIcon/>
    </RedButton>
)

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
            dispatchChangeConfigAuth,
            dispatchChangeConfigPass,
            dispatchChangeConfigDB,
            dispatchChangeConfigModelLength
        }: any = this.props;
        const { config } = configObj;
        console.log(this.props);
        return (
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
                    <div className={classes.modelTable}>
                        <div className={classes.modelHeaders}>
                            <div className={classes.modelHeader}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Name
                                </Typography>
                            </div>
                            <div className={`${classes.modelHeader} ${classes.center}`}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Unique
                                </Typography>
                            </div>
                            <div className={`${classes.modelHeader} ${classes.center}`}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Required
                                </Typography>
                            </div>
                            <div className={classes.modelHeader}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Default
                                </Typography>
                            </div>
                            <div className={classes.modelHeader}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Type
                                </Typography>
                            </div>
                            <div className={classes.modelHeader}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Max. Length
                                </Typography>
                            </div>
                            <div className={classes.modelHeader}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Min. Length
                                </Typography>
                            </div>
                            <div className={`${classes.modelHeader} ${classes.center}`}>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    color="primary"
                                >
                                    Remove
                                </Typography>
                            </div>
                        </div>
                        { config.model && Object.keys(config.model).map((rowName, i) => (
                            <div className={classes.modelRow}>
                                <div className={classes.modelColumn}>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                    >
                                        { rowName }
                                    </Typography>
                                </div>
                                <div className={`${classes.modelColumn} ${classes.center}`}>
                                    <StyledCheckbox
                                        checked={config.model[rowName].unique}
                                        onChange={(e) => {
                                            dispatchChangeConfigModel('unique', e.target.checked)
                                        }}
                                    />
                                </div>
                                <div className={`${classes.modelColumn} ${classes.center}`}>
                                    <StyledCheckbox
                                        checked={!config.model[rowName].allowNull}
                                        onChange={(e) => {
                                            dispatchChangeConfigModel('allowNull', e.target.checked)
                                        }}
                                    />
                                </div>
                                <div className={classes.modelInputColumn}>
                                    <input
                                        value={config.model[rowName].defaultValue ? config.model[rowName].defaultValue : ''}
                                        disabled={config.model[rowName].defaultValue === undefined}
                                        className={classes.input}
                                        onChange={(e) => {
                                            dispatchChangeConfigModel('defaultValue', e.target.value)
                                        }}
                                    />
                                </div>
                                <div className={classes.modelInputColumn}>
                                    <Select
                                        variant="outlined"
                                        value={config.model[rowName].type}
                                        fullWidth
                                        input={<StyledSelect/>}
                                        onChange={(e) => {
                                            dispatchChangeConfigModel('type', e.target.value)
                                        }}
                                    >
                                        <MenuItem value="String">String</MenuItem>
                                        <MenuItem value="Number">Number</MenuItem>
                                        <MenuItem value="Username">Username</MenuItem>
                                        <MenuItem value="Email">Email</MenuItem>
                                        <MenuItem value="Password">Password</MenuItem>
                                    </Select>
                                </div>
                                <div className={classes.modelInputColumn}>
                                    <input
                                        value={config.model[rowName].validate.len.args[0][0]}
                                        className={classes.input}
                                        onChange={(e) => {
                                            dispatchChangeConfigModelLength(rowName, 'min', parseInt(e.target.value))
                                        }}
                                    />
                                </div>
                                <div className={classes.modelInputColumn}>
                                    <input
                                        value={config.model[rowName].validate.len.args[0][1]}
                                        className={classes.input}
                                        onChange={(e) => {
                                            dispatchChangeConfigModelLength(rowName, 'max', parseInt(e.target.value))
                                        }}
                                    />
                                </div>
                                <div className={`${classes.modelColumn} ${classes.center}`}>
                                    <ErrorButton/>
                                </div>
                            </div>
                        )) }
                    </div>
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
        dispatchChangeConfigModel: (key: string, value) => dispatch(changeConfigModel(key, value)),
        dispatchChangeConfigAuth: (key: string, value) => dispatch(changeConfigAuth(key, value)),
        dispatchChangeConfigDB: (key: string, value) => dispatch(changeConfigDB(key, value)),
        dispatchChangeConfigPass: (key: string, value) => dispatch(changeConfigPass(key, value)),
        dispatchChangeConfigModelLength: (modelKey: string, key: string, value) => dispatch(changeConfigModelLength(modelKey, key, value))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(EditAuthContainerBody);