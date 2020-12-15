import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    setProjectValue
} from '../../../../../redux/projects/auth/edit/project/actions';
import {
    fetchConfig,
    changeConfigPass,
} from '../../../../../redux/projects/auth/edit/config/actions';

import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class PasswordRequirements extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, config, dispatchChangeConfigPass }: any = this.props;
        console.log(config);
        return (
            <div className={classes.root}>
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={config.pass.uppercase} 
                            onChange={(e) => {
                                dispatchChangeConfigPass('uppercase', e.target.checked);
                            }} 
                        />
                    }
                    label="Uppercase letters"
                />
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={config.pass.lowercase} 
                            onChange={(e) => {
                                dispatchChangeConfigPass('lowercase', e.target.checked);
                            }} 
                        />
                    }
                    label="Lowercase letters"
                />
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={config.pass.requireNumbers} 
                            onChange={(e) => {
                                dispatchChangeConfigPass('requireNumbers', e.target.checked);
                            }} 
                        />
                    }
                    label="Require numbers"
                />
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={config.pass.requireSpecialChars} 
                            onChange={(e) => {
                                dispatchChangeConfigPass('requireSpecialChars', e.target.checked);
                            }} 
                        />
                    }
                    label="Require special characters"
                />
            </div>
        )
    }
}

const styles: any = (theme) => ({
    root: {
        padding: '10px 5px',
        display: 'flex',
        flexDirection: 'column'
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
        dispatchFetchConfig: (project_id: string) => dispatch(fetchConfig(project_id)),
        dispatchSetProjectValue: (key: string, value) => dispatch(setProjectValue(key, value)),
        dispatchChangeConfigPass: (key: string, value) => dispatch(changeConfigPass(key, value)),
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PasswordRequirements);