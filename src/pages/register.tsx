import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '../auth/auth';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/formStyles';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Register(props) {
    const classes = makeStyles(formStyles)();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const resendEmail = (e) => {
        axios.post(`${props.mainUrl}/api/resend-email/verify-email`, {
            email: email,
            username: username
        })
        .then(({ data }) => {
            setSuccess(data.message);
        })
        .catch(err => {
            setError(err.response.message);
        })
    }

    const submit = (e) => {
        e.preventDefault();
        if (confirmPassword === password) {
            console.log(props);
            axios.post(`/api/user/register`, {
                email: email,
                username: username,
                password: password
            })
            .then(({ data }) => {
                setError('');
                setSuccess(data.message);
            })
            .catch(err => {
                setError(err.response.data.message);
            });
        } else {
            setError('Passwords do not match.')
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Register Page</div>
                <div className={classes.innerCardSubTitle}>
                    Already have an account?&nbsp;
                    <Link href="/login">
                        <a className={classes.innerCardRedirectLink}>Login here.</a>
                    </Link>
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
                    <form action="/register" method="POST" onSubmit={submit} className={classes.form}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                label="Username"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                label="Email address"
                                type="email"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardButton}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disableRipple
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Register.getInitialProps = (ctx) => {
    return {
        mainUrl: process.env.MAIN_URL
    }
}


export default Register;