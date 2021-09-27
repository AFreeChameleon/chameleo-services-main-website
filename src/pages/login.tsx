import { Auth } from '../auth/auth';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ifNotAuth from '../hoc/ifNotAuth';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/formStyles';
import { TextField, Button, SvgIcon } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Login(props) {
    const classes = makeStyles(formStyles)();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(router.query.error ? router.query.error : '');

    const submitLogin = (e) => {
        console.log(props);
        e.preventDefault();
        axios.post(`/api/user/login`, { email, password }, { withCredentials: true })
        .then((res) => {
            setError('');
            router.push('/dashboard');
        })
        .catch((err) => {
            setError(err.response ? err.response.data.errors[0] : 'An error occurred. Please try again later.');
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Login</div>
                <div className={classes.innerCardSubTitle}>
                    Don't have an account?&nbsp;
                    <Link href="/register">
                        <a className={classes.innerCardRedirectLink}>Register here.</a>
                    </Link>
                </div>
                <div className={classes.innerCardForm}>
                    { error !== '' && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    ) }
                    <form onSubmit={submitLogin} className={classes.form}>
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
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type="password"
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
                            disableRipple>
                                Login
                            </Button>
                        </div>
                        <div className={classes.innerCardButton}>
                            <Link href={`/api/user/oauth/google`}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    type="submit"
                                    disableRipple
                                    startIcon={
                                        <SvgIcon style={{width: 18, height: 18}} viewBox="0 0 18 18">
                                            <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                                            <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853"></path>
                                            <path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05"></path>
                                            <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335"></path>
                                        </SvgIcon>
                                    }
                                >
                                    <div style={{paddingTop: '2px'}}>
                                        Sign in with Google
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </form>
                    <div className={classes.innerCardRedirectLinkContainer}>
                        <Link href="/forgot-password">
                            <a className={classes.innerCardRedirectLinkHalf}>Forgot password?</a>
                        </Link>
                        &nbsp;·&nbsp; 
                        <Link href="/reset-email">
                            <a className={classes.innerCardRedirectLinkHalf}>Forgot your email?</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.getInitialProps = (ctx) => {
    console.log(process.env.MAIN_URL)
    return {
        mainUrl: process.env.MAIN_URL
    }
}

export default ifNotAuth(Login);