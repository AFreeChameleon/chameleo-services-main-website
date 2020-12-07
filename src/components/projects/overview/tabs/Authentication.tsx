import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/overview/tabs/actions'
import { withRouter } from 'next/router';

import styles from '../../../../styles/projects/overview/components/tabs/authentication';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
    Collapse,
    Button
} from '@material-ui/core';
import AuthenticationDoughnutChart from './AuthenticationDoughnutChart';

import AddIcon from '@material-ui/icons/Add';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, project, router }: any = this.props;

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
                                variant="h4"
                                component="h4"
                            >
                                Users
                            </Typography>
                        </div>
                        <div className={classes.userTable}>
                            <div className={classes.userTableHeaderRow}>
                                <div className={classes.userTableHeaderRowInner}>
                                    <div className={classes.userTableHeader}>id</div>
                                    <div className={classes.userTableHeader}>Email</div>
                                    <div className={classes.userTableHeader}>Status</div>
                                    <div className={classes.userTableHeader}>Last logged in</div>
                                </div>
                            </div>
                            <div className={classes.userTableRow}>
                                <div className={classes.userTableRowInner}>
                                    <div className={classes.userTableColumn}>1</div>
                                    <div className={classes.userTableColumn}>ben.evans@chamel.io</div>
                                    <div className={classes.userTableColumn}>Online</div>
                                    <div className={classes.userTableColumn}>12/06/2020</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        dispatchSetSelectedTab: (tab: number) => dispatch(setSelectedTab(tab))
    }
}

export default compose<any>(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Authentication));