import { Auth } from '../auth/auth';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ifNotAuth from '../hoc/ifNotAuth';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/formStyles';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Login() {
    const classes = makeStyles(formStyles)();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitLogin = (e) => {
        e.preventDefault();
        Auth.login(email, password)
        .then((data) => {
            console.log(data)
            setError('');
            router.push('/create-new-project');
        })
        .catch((err) => {
            setError(err.message);
        });
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
                    <form action="/login" method="POST" onSubmit={submitLogin} className={classes.form}>
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
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type="password"
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
                            disableRipple>
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className={classes.innerCardButton}>
                        <Link href="http://localhost:8080/api/auth/google">
                            <a className={classes.innerCardRedirectLinkHalf}>Login in with Google</a>
                        </Link>
                    </div>
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

export default ifNotAuth(Login);