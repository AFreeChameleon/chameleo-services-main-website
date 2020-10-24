import { Auth } from '../auth/auth';
import { useState } from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import formStyles from '../styles/formStyles';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Login() {
    const classes = makeStyles(formStyles)();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className={classes.root}>
            <div className={classes.innerCard}>
                <div className={classes.innerCardTitle}>Login Page</div>
                <div className={classes.innerCardForm}>
                    { error !== '' && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    ) }
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
                        onClick={(e) => {
                            Auth.login({ email, password })
                            .then((data) => {
                                console.log(data);
                                window.location.href = '/';
                            })
                            .catch((err) => {
                                console.log(err);
                                setError(err.error)
                            });
                        }}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        disableRipple>
                            Login
                        </Button>
                    </div>
                    <div className={classes.innerCardRedirectLinkContainer}>
                        <Link href="/register">
                            <a className={classes.innerCardRedirectLink}>Don't have an account? Register here.</a>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;