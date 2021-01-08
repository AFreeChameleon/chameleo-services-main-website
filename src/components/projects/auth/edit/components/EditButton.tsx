import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    setConfigErrors
} from '../../../../../redux/projects/auth/edit/config/actions';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
    MAIN_URL
} from '../../../../../globals';
import {
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class EditButton extends React.Component {
    constructor(props) {
        super(props);
    }

    checkErrorsExist(config: any) {
        const { model, mail } = config;
        console.log(model, mail)
        const errors = [];
        const modelEmailRows = model.filter((row) => row.type === 'Email');
        const modelPasswordRows = model.filter((row) => row.type === 'Password');
        console.log(modelEmailRows, modelPasswordRows)
        if (modelEmailRows.length === 0) {
            errors.push('Model: missing row with type: Email.');
        } else {
            if (modelEmailRows.length > 1)
                errors.push('Model: Only one row can have the Email type.');
            if (!modelEmailRows[0].unique === true)
                errors.push('Model: Email row needs to be unique.');
            if (modelEmailRows[0].allowNull)
                errors.push('Model: Email row needs to be required.');
        }
        if (modelPasswordRows.length === 0) {
            errors.push('Model: missing row with type: Password.');
        } else {
            if (modelPasswordRows.length > 1)
                errors.push('Model: Only one row can have the Password type.');
            if (modelPasswordRows[0].allowNull)
                errors.push('Model: Password row needs to be required.');
        }
        if (mail.enabled) {
            if (mail.fromAddress)
                errors.push('Mail: From address missing.');
            if (!mail.verifyContent.includes('{__verify__}'))
                errors.push('Mail: {__verify__} is missing in email content');
            if (!mail.resetContent.includes('{__temporary password__}'))
                errors.push('Mail: {__temporary password__} is missing in email content');
        }
        return errors;
    }

    render() {
        const { classes, config, project, dispatchSetConfigErrors }: any = this.props;
        return (
            <div className={classes.root}>
                <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={(e) => {
                        const errors = this.checkErrorsExist(config);
                        if (errors.length > 0) {
                            dispatchSetConfigErrors(errors);
                            document.getElementById('top').scrollIntoView({ behavior: 'smooth' })
                        } else {
                            // Do stuff
                            console.log('No errors')
                            axios.patch(`${MAIN_URL}/api/projects/${project.project_id}/containers/auth/edit`, {
                                config: config
                            }, { withCredentials: true })
                            .then((res: AxiosResponse) => {
                                dispatchSetConfigErrors([]);
                                console.log(res.data.message)
                            })
                            .catch((err: AxiosError) => {
                                dispatchSetConfigErrors([err.response.data.message]);
                            })
                        }
                    }}
                >
                    Save Changes
                </Button>
            </div>
        )
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
        dispatchSetConfigErrors: (errors: string[]) => dispatch(setConfigErrors(errors))
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(EditButton);