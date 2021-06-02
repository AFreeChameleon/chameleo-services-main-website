import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
    Alert
} from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

class ErrorList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, errors }: any = this.props;
        return (
            <div className={classes.root} id="project-edit-errors-list">
                { errors.map((error, i) => (
                    <Alert severity="error" className={classes.error} key={i}>{ error }</Alert>
                )) }
            </div>
        )
    }
}

const styles: any = (theme) => ({
    root: {

    },
    error: {
        marginBottom: '10px'
    }
})

const mapStateToProps = (state) => {
    return {
        project: state.project,
        errors: state.config.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ErrorList);