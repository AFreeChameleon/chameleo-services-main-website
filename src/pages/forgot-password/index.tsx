import { Auth } from '../../auth/auth';
import { useState } from 'react';

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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const submitForgotPassword = (e) => {
        e.preventDefault();
        Auth.resetPassword(email)
        .then((data) => {
            setError('');
            setSuccess(data.message);
        })
        .catch((err) => {
            console.log(err)
            setSuccess('');
            setError(err.message);
        })
    }

    const resendEmail = (e) => {
        Auth.resetPassword(email)
        .then((data) => {
            setError('');
            setSuccess(data.message);
        })
        .catch((err) => {
            setSuccess('');
            setError(err.message);
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Forgot Password</div>
                <div className={classes.innerCardSubTitle}>
                    Enter in your email address and you'll recieve a link to reset your password
                </div>
                <div className={classes.innerCardForm}>
                    { error !== '' && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    ) }
                    { success !== '' && (
                        <>
                            <Alert severity="success">
                                {success}
                            </Alert>
                            <div className={classes.resendEmailContainer}>
                                <div className={classes.resendEmailTitle}>Didn't recieve the email?</div>
                                <a
                                    className={classes.resendEmailLink}
                                    onClick={resendEmail}
                                >Resend email</a>
                            </div>
                        </>
                    ) }
                    <form action="/forgot-password" method="POST" onSubmit={submitForgotPassword} className={classes.form}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                label="Email address"
                                type="email"
                                color="secondary"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardButton}>
                            <Button
                                variant="contained"
                                color="secondary"
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