import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
    Modal,
    Backdrop,
    Fade,
    Typography,
    TextField,
    Snackbar,
    Alert,
    Button
} from '@mui/material';
import { StyledTextField, RedButton } from '../../../Inputs';
import { MAIN_URL } from '../../../../globals';

import classes from './DeleteContainer.module.scss';

type DeleteContainerPropTypes = {
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
                this.setState({ errorMessage: (err.response && err.response.data) ? (err.response.data as any).message : 'An error occurred while deleting container.' });
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
        const { open, container, onClose } = this.props;
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

export default DeleteContainer;