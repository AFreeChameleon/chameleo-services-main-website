import {
    Box,
    TextField,
    Button
} from '@mui/material';

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