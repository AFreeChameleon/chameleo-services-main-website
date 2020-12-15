import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
        const errors = [];
        const modelEmailRow = model.find((row) => row.type === 'Email');
        const modelPasswordRow = model.find((row) => row.type === 'Password');
        if (!modelEmailRow)
            errors.push('Model: missing row with type: Email.');
        if (!modelEmailRow.unique === true)
            errors.push('Model: Email row needs to be unique.');
        if (!modelEmailRow.required)
            errors.push('Model: Email row needs to be required.');
        if (!modelPasswordRow)
            errors.push('Model: missing row with type: Password.');
        if (!modelPasswordRow.required)
            errors.push('Password row needs to be required.');
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
        const { classes, config }: any = this.props;
        return (
            <div className={classes.root}>
                <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={(e) => {
                        const errors = this.checkErrorsExist(config);
                        if (errors.length > 0) {

                        } else {
                            // Do stuff
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
    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(EditButton);