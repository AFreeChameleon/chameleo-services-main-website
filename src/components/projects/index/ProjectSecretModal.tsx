import React from 'react';
import { NextRouter, withRouter } from 'next/router'
import axios from 'axios';
import {
    MAIN_URL
} from '../../../globals';

import {
    Typography,
    Collapse,
    Button,
    IconButton,
    Modal,
    TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

class ProjectSecretModal extends React.Component<{ open: boolean, onClose: (e) => void, projectId: string, classes: any, router: NextRouter }, any> {
    constructor(props) {
        super(props);

        this.state = {
            project_secret: '',
            error: ''
        }
    }

    submitForm() {
        const { projectId, router } = this.props;
        const { project_secret } = this.state;

        axios.post(`${MAIN_URL}/api/projects/${projectId}/verify`, {
            project_secret: project_secret
        }, { withCredentials: true })
        .then((res) => {
            router.push(`/projects/${projectId}`);
            this.setState({ error: '', project_secret: '' });
            console.log('woopwoop')
        })
        .catch((err) => {
            console.log(err.response)
            if (err.response) {
                this.setState({ error: err.response.data.message })
            } else {
                this.setState({ error: err.message })
            }
        });
    }

    render() {
        const { open, onClose, projectId, classes } = this.props;
        const { project_secret } = this.state;
        return (
            <Modal
                className={classes.modal}
                open={open}
                onClose={onClose}
            >
                <div className={classes.modalBody}>
                    <Typography 
                        variant="h5" 
                        // align="center"
                        className={classes.modalTitle}
                    >
                        Start container
                    </Typography>
                    <div className={classes.modalSubTitle}>
                        <Typography
                            variant="caption"
                            
                        >
                            To continue, enter in the project secret
                        </Typography>
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            label="Project Secret"
                            value={project_secret}
                            onChange={(e) => this.setState({ project_secret: e.target.value })}
                        />
                    </div>
                    <div className={classes.modalSubmitButtonContainer}>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={(e) => this.submitForm()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const styles = (theme) => ({
    modal: {
        display: 'flex',
        placeItems: 'center'
    },
    modalBody: {
        width: '400px',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        outline: 'none',
        padding: '10px 20px 15px 20px'
    },
    modalTitle: {
        // fontWeight: 600
    },
    modalSubTitle: {
        color: '#888888',
        paddingBottom: '20px'
    },
    modalSubmitButtonContainer: {
        paddingTop: '20px'
    }
})

export default withStyles(styles)(withRouter(ProjectSecretModal));