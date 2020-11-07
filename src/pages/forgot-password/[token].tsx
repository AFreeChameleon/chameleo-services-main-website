import { Auth } from '../../auth/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import {
    TextField,
    Button
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../../styles/formStyles';

function ForgotPasswordToken({ token }) {
    const classes = makeStyles(formStyles)();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const submitResetPassword = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            Auth.verifyResetPasswordToken(token, password)
            .then((data) => {
                console.log(data);
                setSuccess(data.message);
                setError('');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            })
        } else {
            setError('Passwords must be identical.');
        }
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Reset Password</div>
                <div className={classes.innerCardSubTitle}>
                    Enter in your new password.
                </div>
                <div className={classes.innerCardForm}>
                    { error !== '' && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    ) }
                    { success !== '' && (
                        <Alert severity="success">
                            {success}
                        </Alert>
                    ) }
                    <form onSubmit={submitResetPassword} className={classes.form}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type="password"
                                color="secondary"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                label="Confirm password"
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

ForgotPasswordToken.getInitialProps = ({ query }) => {
    return {
        token: query.token
    }
}

export default ForgotPasswordToken;