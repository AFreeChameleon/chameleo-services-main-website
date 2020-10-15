import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/login/formStyles';

import {
    TextField,
    Button
} from '@material-ui/core';

function Register() {
    const classes = makeStyles(formStyles)();
    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Register Page</div>
                <div className={classes.innerCardForm}>
                    <div className={classes.innerCardInput}>
                        <TextField
                            label="Full name"
                            type="text"
                            color="secondary"
                            fullWidth
                        />
                    </div>
                    <div className={classes.innerCardInput}>
                        <TextField
                            label="Email address"
                            type="email"
                            color="secondary"
                            fullWidth
                        />
                    </div>
                    <div className={classes.innerCardInput}>
                        <TextField
                            label="Password"
                            type="password"
                            color="secondary"
                            fullWidth
                        />
                    </div>
                    <div className={classes.innerCardButton}>
                        <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        disableRipple>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;