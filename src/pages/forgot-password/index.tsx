import { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../../styles/formStyles';

function ForgotPassword() {
    const classes = makeStyles(formStyles)();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');

    const submitForgotPassword = (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');
        axios.post('/api/user/reset-password', {
            email: email
        })
        .then((res) => {
            console.log(res.data, res.status)
            if (res.status === 200) {
                setSuccess(res.data.message);
            } else {
                setErrors(res.data.errors);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.response) {
                setErrors(err.response.data.errors);
            } else {
                setErrors(['An error occurred while resetting your password. Please try again soon.'])
            }
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Forgot Password</div>
                <div className={classes.innerCardSubTitle}>
                    Enter in your email address and you'll recieve a link to reset your password
                </div>
                <div className={classes.innerCardForm}>
                    { errors.map((e) => (
                        <Alert severity="error">
                            {e}
                        </Alert>
                    )) }
                    { success !== '' && (
                        <>
                            <Alert severity="success">
                                {success}
                            </Alert>
                            <div className={classes.resendEmailContainer}>
                                <div className={classes.resendEmailTitle}>Didn't recieve the email?</div>
                                <a
                                    className={classes.resendEmailLink}
                                    onClick={submitForgotPassword}
                                >Resend email</a>
                            </div>
                        </>
                    ) }
                    <form action="/api/user/reset-password" method="POST" onSubmit={submitForgotPassword} className={classes.form}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                label="Email address"
                                type="email"
                                color="primary"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardButton}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disableRipple
                            >
                                Send Email
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;