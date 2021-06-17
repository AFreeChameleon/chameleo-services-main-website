import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { StyledTextField } from '../../../Inputs';
import { MAIN_URL } from '../../../../globals';

type RenameContainerPropTypes = {
    classes: any;
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
        const { classes, open, onClose, container } = this.props;
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

const styles = (theme): any => ({
    root: {
        display: 'grid',
        placeItems: 'center'
    },
    paper: {
        backgroundColor: '#212121',
        width: '500px',
        borderRadius: '5px',
        padding: '10px 20px'
    },
    renameButton: {
        marginTop: '20px'
    },
    renameTextField: {

    },
    title: {
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '15px',
        color: '#ffffff'
    }
});

export default withStyles(styles)(RenameContainer);