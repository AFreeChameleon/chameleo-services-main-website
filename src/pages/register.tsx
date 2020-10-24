import { Auth } from '../auth/auth';
import { useState } from 'react';
import Link from 'next/link';

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
                        onClick={(e) => {
                            console.log(username)
                            Auth.register({ email, password, username })
                            .then((data) => {
                                console.log(data);
                                window.location.href = '/login';
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
                            Register
                        </Button>
                    </div>
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