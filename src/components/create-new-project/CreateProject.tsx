import { makeStyles } from '@material-ui/core/styles';
import createProjectStyles from '../../styles/create-new-project/components/createProjectStyles';

import {
    Button
} from '@material-ui/core';

function CreateProject() {
    const classes = makeStyles(createProjectStyles)();
    return (
        <div className={classes.root}>
            <div className={classes.title}>Finished</div>
            <div className={classes.subTitle}>You won't be able to change these settings</div>
            <div className={classes.button}>
                <Button
                fullWidth
                variant="contained"
                color="secondary">
                    Create New Project    
                </Button>
            </div>
        </div>
    )
}

export default CreateProject;