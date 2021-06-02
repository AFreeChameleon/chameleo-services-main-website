import React from 'react';
import { withRouter } from 'next/router';

import styles from '../../../../../styles/projects/overview/components/tabs/authentication';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
} from '@material-ui/core';

class AuthenticationMissing extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, router } = this.props;
        return (
            <div className={classes.authMissingContainer}>
                <div className={classes.authMissingTitle}>
                    <Typography
                        variant="body2"
                    >
                        Authentication has not been set up yet!
                    </Typography>
                </div>
                <div className={classes.authMissingButton}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => router.push(`${router.asPath}/auth/new`)}
                    >
                        Set up authentication
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(AuthenticationMissing));