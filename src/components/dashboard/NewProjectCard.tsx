
import { makeStyles } from '@material-ui/core/styles';
import newProjectStyles from '../../styles/dashboard/components/newProjectStyles';
import {
    TextField,
    Button
} from '@material-ui/core';

function NewProjectCard() {
    const classes = makeStyles(newProjectStyles)();
    return (
        <div className={classes.container}>
            <div className={classes.newProjectContainer}>
                <div className={classes.newProjectHeader}>New Project</div>
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