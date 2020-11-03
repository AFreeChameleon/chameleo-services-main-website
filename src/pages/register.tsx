import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '../auth/auth';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/formStyles';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Register() {
    const classes = makeStyles(formStyles)();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const resendEmail = (e) => {
        axios.post('http://localhost:8080/api/resend-email', {
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

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Register Page</div>
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
                    <form action="/register" method="POST" onSubmit={(e) => {
                        e.preventDefault();
                        Auth.register({ email, password, username })
                        .then((data) => {
                            setSuccess(data.message);
                            setError('');
                        })
                        .catch((err) => {
                            setError(err.message);
                            setSuccess('');
                        });
                    }}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                label="Username"
                                type="text"
                                color="secondary"
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
                                color="secondary"
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
                                color="secondary"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardButton}>
                            <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disableRipple
                            type="submit">
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={classes.innerCardRedirectLinkContainer}>
                    <Link href="/login">
                        <a className={classes.innerCardRedirectLink}>Already have an account? Login here.</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register;