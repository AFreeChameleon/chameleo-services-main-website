import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { MAIN_URL } from '../../../../../globals';
import { setSelectedTab } from '../../../../../redux/projects/overview/tabs/actions';
import { setProjectSecret, startContainer, fetchProjectDetails } from '../../../../../redux/projects/overview/project/actions';
import { withRouter } from 'next/router';

import styles from '../../../../../styles/projects/overview/components/tabs/authentication';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
    Button,
} from '@material-ui/core';
import {
    RedButton
} from '../../../auth/edit/components/inputs';
import AuthenticationDoughnutChart from './AuthenticationDoughnutChart';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class AuthenticationContent extends React.Component<any, { loading: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    startContainer() {
        const { project, dispatchFetchProjectDetails } = this.props;

        this.setState({
            loading: true
        });
        axios.post(`${MAIN_URL}/api/projects/${project.project_id}/containers/auth/start`, 
        {}, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            dispatchFetchProjectDetails(project.project_id);
            this.setState({
                loading: false
            });
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
            this.setState({
                loading: false
            });
        });
    }

    stopContainer() {
        const { project, dispatchFetchProjectDetails } = this.props;

        this.setState({
            loading: true
        });
        console.log('loading...')
        axios.post(`${MAIN_URL}/api/projects/${project.project_id}/containers/auth/stop`, 
        {}, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            dispatchFetchProjectDetails(project.project_id);
            this.setState({
                loading: false
            });
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
            this.setState({
                loading: false
            });
        });
        console.log('loading done')
    }

    render() {
        const { classes, router, project, container } = this.props;
        
        return (
            <>
            <div className={classes.statusContainer}>
                <div className={classes.statusText}>
                    <Typography
                        variant="body1"
                    >
                        Status: <span 
                            className={
                                container.status === 'Stopped' ? 
                                    classes.statusStopped : classes.statusStarted
                            }
                        >
                            {container.status}
                        </span>
                    </Typography>
                </div>
                <div>
                    { container.status === 'Stopped' ? <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.statusIconButton}
                        startIcon={<PlayArrowIcon/>}
                        onClick={(e) => this.startContainer()}
                        disabled={this.state.loading}
                    >
                        { this.state.loading ? 'Starting Container...' : 'Start Container' }
                    </Button> : <RedButton
                        variant="outlined"
                        className={classes.statusIconStopButton}
                        startIcon={<StopIcon/>}
                        onClick={(e) => this.stopContainer()}
                        disabled={this.state.loading}
                    >
                        { this.state.loading ? 'Stopping Container...' : 'Stop Container' }
                    </RedButton> }
                </div>
            </div>
            <div className={classes.analyticsGrid}>
                <div className={classes.doughnutChartContainer}>
                    <AuthenticationDoughnutChart/>
                </div>
                <div className={classes.activeUsersContainer}>
                    <Typography
                        variant="h3"
                        component="h3"
                    >
                        0
                    </Typography>
                    <Typography
                    
                    >
                        monthly active users
                    </Typography>
                </div>
                <div className={classes.avgTimeLoggedInContainer}>
                    <Typography
                        variant="h3"
                        component="h3"
                    >
                        0
                    </Typography>
                    <Typography variant="h4">s</Typography>
                    <Typography
                        variant="body1"
                        style={{paddingLeft: '10px'}}
                    >
                        average time logged in
                    </Typography>
                </div>
            </div>
            <div className={classes.editAuthConfig}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                        router.push(`/projects/${project.project_id}/auth/edit`);
                    }}
                >
                    Edit Auth Configuration
                </Button>
            </div>
            <div className={classes.userContainer}>
                <div className={classes.subTitle}>
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        Users
                    </Typography>
                    <hr/>
                </div>
                <div className={classes.userTable}>
                    <div className={classes.userTableHeaderRow}>
                        <div className={classes.userTableHeader}>id</div>
                        <div className={classes.userTableHeader}>Email</div>
                        <div className={classes.userTableHeader}>Status</div>
                        <div className={classes.userTableHeader}>Last logged in</div>
                    </div>
                    <div className={classes.userTableRow}>
                        <div className={classes.userTableColumn}>1</div>
                        <div className={classes.userTableColumn}>ben.evans@chamel.io</div>
                        <div className={classes.userTableColumn}>Online</div>
                        <div className={classes.userTableColumn}>12/06/2020</div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
        project: state.project,
        container: state.project.auth.containers[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetSelectedTab: (tab: number) => dispatch(setSelectedTab(tab)),
        dispatchStartContainer: (project_id: string, project_secret: string) => dispatch(startContainer(project_id, project_secret)),
        dispatchSetProjectSecret: (project_secret: string) => dispatch(setProjectSecret(project_secret)),
        dispatchFetchProjectDetails: (project_id: string) => dispatch(fetchProjectDetails(project_id))
    }
}

export default compose<any>(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(AuthenticationContent));