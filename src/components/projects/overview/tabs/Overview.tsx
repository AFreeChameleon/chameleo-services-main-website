import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/overview/tabs/actions';
import { fetchProjectDetails } from '../../../../redux/projects/overview/project/actions';
import { withRouter } from 'next/router';

import styles from '../../../../styles/projects/overview/components/tabs/overview';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
    Collapse,
    Button
} from '@material-ui/core';
import AuthenticationDoughnutChart from './authentication/AuthenticationDoughnutChart';

import AddIcon from '@material-ui/icons/Add';

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, router, project, dispatchSetSelectedTab }: any = this.props;
        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <Typography
                        variant="h4"
                        component="h4"
                    >
                        Overview
                    </Typography>
                </div>
                <hr className={classes.titleDivider}/>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                >
                    Project secret: {project.project_secret}
                </Typography>
                <div className={classes.content}>
                    {/* <div className={classes.dropdownContainer}>
                        <div className={classes.dropdownTitle}>
                            <Typography
                                variant="body1"
                                component="p"
                            >
                                Authentication
                            </Typography>
                        </div>
                        <Collapse
                            in={true}
                        >
                            { project.auth.containers.length > 0 ? (
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
                                    <div className={classes.footerContainer}>
                                        <div
                                            className={classes.footerText}
                                            onClick={(e) => {
                                                dispatchSetSelectedTab(1)
                                            }}
                                        >
                                            Go To Tab
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={classes.missingAuthBox}>
                                    <div>
                                        <div className={classes.missingAuthTitle}>Authentication has not been set up yet!</div>
                                        <div className={classes.missingAuthButton}>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                onClick={(e) => {
                                                    router.push(`/projects/${project.project_id}/auth/new`);
                                                }}
                                            >
                                                Set up Authentication
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </Collapse>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
        project: state.project,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetSelectedTab: (tab: number) => dispatch(setSelectedTab(tab)),
        dispatchFetchProjectDetails: (project_id: string) => dispatch(fetchProjectDetails(project_id))
    }
}

export default compose<any>(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Overview));