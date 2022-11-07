
import { makeStyles } from '@material-ui/core/styles';
import newProjectStyles from '../../styles/dashboard/components/newProjectStyles';
import {
    Box
} from '@mui/material';
import {
    TextField,
    Button
} from '@material-ui/core';

import classes from './NewProjectCard.module.scss';

function NewProjectCard() {
    return (
        <div className={classes.container}>
            <div className={classes.newProjectContainer}>
                <Box className={classes.newProjectHeader} style={{}}>
                    New Project
                </Box>
                <div className={classes.newProjectItem}>
                    <TextField
                        fullWidth
                        className={classes.newProjectItemInput}
                        variant="outlined"
                        color="secondary"
                        label="Project name"
                    />
                </div>
                <div className={classes.newProjectItem}>
                    <Button
                        fullWidth
                        className={classes.newProjectItemInput}
                        variant="contained"
                        color="secondary"
                    >Create New Project</Button>
                </div>
            </div>
        </div>
    )
}

export default NewProjectCard;