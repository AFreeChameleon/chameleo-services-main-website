import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { TextField, Button, Alert } from '@mui/material';

import classes from '../../styles/Form.module.scss';
import { setErrors } from '../../redux/projects/auth/new/errors/actions';

function ForgotPasswordToken({ token }) {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');

    const submitResetPassword = (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');
        if (password === confirmPassword) {
            axios.post(`/api/user/reset-password/${token}`, {
                password: oldPassword,
                newPassword: password
            })
            .then((res) => {
                if (res.status === 200) {
                    router.push('/login');
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                if (err.response) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors(['An error occurred while verifying your token.']);
                }
            })
        } else {
            setErrors(['Passwords must be identical.']);
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
                    { errors.map((e) => (
                        <Alert severity="error">
                            {e}
                        </Alert>
                    )) }
                    { success !== '' && (
                        <Alert severity="success">
                            {success}
                        </Alert>
                    ) }
                    <form onSubmit={submitResetPassword} className={classes.form}>
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={oldPassword}
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                }}
                                label="Old Password"
                                type="password"
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
                        <div className={classes.innerCardInput}>
                            <TextField
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                label="Confirm password"
                                type="password"
                                color="primary"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className={classes.innerCardButton}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
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