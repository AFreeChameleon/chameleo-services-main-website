import axios from 'axios';
import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectSetValue } from '../../../redux/projects/index/project/actions';

import { makeStyles } from '@material-ui/core/styles';
import { 
    TextField,
    Modal,
    Typography,
    Button
} from '@material-ui/core';

const styles = makeStyles({
    modal: {
        display: 'flex',
        placeItems: 'center'
    },
    modalTitle: {
        fontWeight: 600
    },
    modalBody: {
        width: '400px',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        outline: 'none',
        padding: '10px 20px 15px 20px'
    },
    modalTextField: {
        marginTop: '20px'
    },
    modalSubmit: {
        marginTop: '30px'
    }
})

const NewProjectModal: FunctionComponent = () => {
    const classes = styles();
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();

    const submit = async (e) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/projects/new`, {
                project_name: project.newProjectName
            }, { withCredentials: true });
            // Post success message
        } catch (err) {
            console.log(err.message);
            // Post error message
        }
    }
    return (
        <Modal
            open={project.newProjectModalOpen}
            onClose={(e) => dispatch(projectSetValue('newProjectModalOpen', false))}
            className={classes.modal}
        >
            <div className={classes.modalBody}>
                <Typography 
                    variant="h4" 
                    align="center"
                    className={classes.modalTitle}
                >
                    Create Project
                </Typography>

                <div className={classes.modalTextField}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        label="Project Name"
                        fullWidth
                        value={project.newProjectName}
                        onChange={(e) => {
                            dispatch(projectSetValue('newProjectName', e.target.value))
                        }}
                    />
                </div>

                <div className={classes.modalSubmit}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={submit}
                    >
                        Create Project
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default NewProjectModal;