import { FunctionComponent } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import createProjectStyles from '../../styles/create-new-project/components/createProjectStyles';

import {
    Button
} from '@material-ui/core';

type CreateProjectProps = {
    state: any;
    setErrors: Function;
}

const CreateProject: FunctionComponent<CreateProjectProps> = ({ state, setErrors }) => {
    const classes = makeStyles(createProjectStyles)();
    const buildProject = (e) => {
        if (state.errors.length > 0) {
            window.location.replace('#top');
        } else {
            console.log(state);
            axios.post('http://localhost:8080/api/build-config', state, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                setErrors([ err.message ]);
            })
        }
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>Finished</div>
            <div className={classes.subTitle}>You won't be able to change these settings</div>
            <div className={classes.button}>
                <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={buildProject}>
                    Create New Project    
                </Button>
            </div>
        </div>
    )
}

export default CreateProject;