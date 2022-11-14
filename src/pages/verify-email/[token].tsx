import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    Button
} from '@mui/material';

import classes from './VerifyToken.module.scss';

function VerifyToken({ error, message }) {
    const router = useRouter();

    useEffect(() => {
        if (!error) {
            router.push('/login');
        }
    }, []);

    return !error ? (
        <div className={classes.root}>
            <div className={classes.innerContainer}>
                <div className={classes.innerContainerImg}>
                    <img src="/img/baby-chameleon.png" />
                </div>
                <div className={classes.innerContainerTitle}>
                    Verified!
                </div>
                <div className={classes.innerContainerSubTitle}>
                    Redirecting you to login shortly...
                </div>
            </div>
        </div>
    ) : (
        <div className={classes.root}>
            <div className={classes.innerContainer}>
                <div className={classes.innerContainerImg}>
                    <img src="/img/baby-chameleon.png" />
                </div>
                <div className={classes.innerContainerTitle}>
                    An error occurred while verifying your email.
                </div>
                <div className={classes.innerContainerButton}>
                    <Button
                        color="secondary"
                        variant="contained" 
                        fullWidth
                        onClick={(e) => router.push('/register')}
                    >
                        Go back to register
                    </Button>
                </div>
            </div>
        </div>
    );
}

VerifyToken.getInitialProps = async ({ query }) => {
    try {
        const res = await axios.post(`${process.env.HOST}/api/user/verify-email/${query.token}`);
        return {
            error: false,
            message: res.data.message
        }
    } catch (err) {
        return {
            error: true,
            message: err.response.data.message
        }
    }
}

export default VerifyToken;