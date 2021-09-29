import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    removeErrorMessage,
    setErrorMessages,
    setErrorOpen
} from '../redux/errors/actions';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

type ErrorListProps = {
    classes: any;
    errors: any;
    dispatchSetErrorMessages: (val: string[] | []) => void;
    dispatchRemoveErrorMessage: (val: string) => void;
    dispatchSetErrorOpen: (val: boolean) => void;
}

class ErrorList extends React.Component<ErrorListProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            classes, 
            errors, 
            dispatchSetErrorMessages,
            dispatchRemoveErrorMessage,
            dispatchSetErrorOpen
        } = this.props;
        return (
            <div className={classes.root}>
                <Snackbar
                    open={errors.open}
                    autoHideDuration={6000}
                    onClose={(e) => {
                        dispatchSetErrorOpen(false);
                        dispatchSetErrorMessages([]);
                    }}
                >
                    <div>
                        {errors.messages.map((message, i) => (
                            <div className={classes.errorItem} key={i}>
                                <Alert
                                    severity="error"
                                    onClose={(e) => dispatchRemoveErrorMessage(message)}
                                >
                                    {message}
                                </Alert>
                            </div>
                        ))}
                    </div>
                </Snackbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    dispatchSetErrorMessages: (val: string[] | []) => dispatch(setErrorMessages(val)),
    dispatchRemoveErrorMessage: (val: string) => dispatch(removeErrorMessage(val)),
    dispatchSetErrorOpen: (val: boolean) => dispatch(setErrorOpen(val))
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        errorItem: {
            marginTop: '20px'
        }
    }))
)(ErrorList);