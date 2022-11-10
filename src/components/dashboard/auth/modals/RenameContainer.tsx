import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
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
import { StyledTextField } from '../../../Inputs';
import { MAIN_URL } from '../../../../globals';

import classes from './RenameContainer.module.scss';

type RenameContainerPropTypes = {
    open: boolean;
    container: any;
    onClose: (e) => void;
    fetchContainers: () => void;
}

type RenameContainerStateTypes = {
    containerName: string;
    errorMessage: string;
}

class RenameContainer extends React.Component<RenameContainerPropTypes, RenameContainerStateTypes> {
    constructor(props) {
        super(props);

        this.state = {
            containerName: this.props.container.name,
            errorMessage: ''
        }

        this.submitRenameContainer = this.submitRenameContainer.bind(this);
    }

    async submitRenameContainer(e) {
        const { container, onClose, fetchContainers } = this.props;
        const { containerName, errorMessage } = this.state;

        try {
            axios.post(`${MAIN_URL}/api/containers/auth/rename`, 
                { 
                    container_id: container.id, 
                    container_name: container.name,
                    new_container_name: containerName 
                }, 
                { withCredentials: true }
            ).then((res: AxiosResponse) => {
                this.setState({ errorMessage: '' });
                fetchContainers();
                onClose(e);
            }).catch((err: AxiosError) => {
                this.setState({ errorMessage: (err.response && err.response.data) ? (err.response.data as any).message : 'An error occurred while renaming container.' });
            });
        } catch (err) {
            console.log(err.message)
            this.setState({ errorMessage: 'An error occurred while renaming container.' });
        }
    }

    handleSnackbarClose(e, r?) {
        if (r === 'clickaway') {
            return;
        }
        this.setState({ errorMessage: '' })
    }

    render() {
        const { open, onClose, container } = this.props;
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
                                Rename Container
                            </div>
                            <StyledTextField
                                fullWidth
                                label="Container Name"
                                color="secondary"
                                className={classes.renameTextField}
                                value={containerName}
                                onChange={(e) => this.setState({ containerName: e.target.value })}
                            />
                            <Button
                                fullWidth
                                color="secondary"
                                variant="contained"
                                className={classes.renameButton}
                                onClick={this.submitRenameContainer}
                            >
                                Rename
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}

export default RenameContainer;