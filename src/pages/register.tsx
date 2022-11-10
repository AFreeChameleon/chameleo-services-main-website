import { Auth } from '../auth/auth';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

import { TextField, Button, Alert, Typography } from '@mui/material';

import classes from '../styles/Form.module.scss';

function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');

    const resendEmail = (e) => {
        axios.post(`/api/user/verify-email/email`, {
            email: email,
            username: username
        })
        .then(({ data }) => {
            setSuccess(data.message);
        })
        .catch(err => {
            setErrors(err.response.data.errors);
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
                setErrors([]);
                setSuccess(data.message);
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
        } else {
            setErrors([...errors, 'Passwords do not match.'])
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Register</div>
                <div className={classes.innerCardSubTitle}>
                    Already have an account?&nbsp;
                    <Link href="/login" className={classes.innerCardRedirectLink}>
                        <Typography component="span" variant="body2" sx={{ color: 'secondary.main' }}>
                            Login here.
                        </Typography>
                    </Link>
                </div>
                <div className={classes.innerCardForm}>
                    { errors.length > 0 && errors.map((error) =>
                        <Alert severity="error">
                            {error || 'An error occurred'}
                        </Alert>
                    ) }
                    { success !== '' && (
                        <>
                            <Alert severity="success">
                                {success}
                            </Alert>
                            <div className={classes.resendEmailContainer}>
                                <div className={classes.resendEmailTitle}>Didn't recieve the email?</div>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'secondary.main' }}
                                    className={classes.resendEmailLink}
                                    onClick={resendEmail}
                                >
                                    Resend email
                                </Typography>
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