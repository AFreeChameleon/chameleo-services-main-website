import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styles from '../../../../../styles/projects/overview/components/tabs/authentication';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
} from '@material-ui/core';

import AuthenticationContent from './AuthenticationContent';
import AuthenticationMissing from './AuthenticationMissing';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, containers }: any = this.props;
        console.log(containers)
        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <Typography
                        variant="h4"
                        component="h4"
                    >
                        Authentication
                    </Typography>
                    <hr className={classes.titleDivider}/>
                </div>
                <div className={classes.content}>
                    { containers.length > 0 ? 
                        <AuthenticationContent/> : 
                        <AuthenticationMissing/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    containers: state.project.auth.containers
})

export default compose(
    connect(mapStateToProps)
)(withStyles(styles)(Authentication));