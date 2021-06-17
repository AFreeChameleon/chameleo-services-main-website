import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button'
import { StyledTextField, RedButton } from '../../../Inputs';
import { MAIN_URL } from '../../../../globals';

type DeleteContainerPropTypes = {
    classes: any;
    open: boolean;
    container: any;
    onClose: (e) => void;
    fetchContainers: () => void;
}

type DeleteContainerStateTypes = {
    containerName: string;
    errorMessage: string;
}

class DeleteContainer extends React.Component<DeleteContainerPropTypes, DeleteContainerStateTypes> {
    constructor(props) {
        super(props);

        this.state = {
            containerName: '',
            errorMessage: ''
        }

        this.submitRenameContainer = this.submitRenameContainer.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
    }

    async submitRenameContainer(e) {
        const { container, onClose, fetchContainers } = this.props;
        const { containerName } = this.state;

        try {
            axios.post(`${MAIN_URL}/api/containers/auth/destroy`, 
                { container_name: containerName }, 
                { withCredentials: true }
            ).then((res: AxiosResponse) => {
                this.setState({ errorMessage: '' });
                fetchContainers();
                onClose(e);
            }).catch((err: AxiosError) => {
                this.setState({ errorMessage: err.response.data.message });
            });
        } catch (err) {
            console.log(err.message)
            this.setState({ errorMessage: 'An error occurred while deleting container.' });
        }
    }

    handleSnackbarClose(e, r?) {
        if (r === 'clickaway') {
            return;
        }
        this.setState({ errorMessage: '' })
    }

    render() {
        const { classes, open, container, onClose } = this.props;
        const { containerName, errorMessage } = this.state;

        return (
            <>
                <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="error" variant="filled" elevation={6} >
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Modal
                    className={classes.root}
                    open={open}
                    onClose={onClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <div
                                className={classes.title}
                            >
                                Delete Container: {container.name}?
                            </div>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.deleteButton}
                                onClick={this.submitRenameContainer}
                            >
                                Delete
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}

const styles = (theme): any => ({
    root: {
        display: 'grid',
        placeItems: 'center'
    },
    paper: {
        backgroundColor: '#212121',
        minWidth: '300px',
        borderRadius: '5px',
        padding: '10px 20px 15px 20px'
    },
    deleteButton: {
        marginTop: '10px',
        backgroundColor: '#ff1744',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#ff174488'
        }
    },
    renameTextField: {

    },
    title: {
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '5px',
        color: '#ffffff'
    }
});

export default withStyles(styles)(DeleteContainer);