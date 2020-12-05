import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/overview/tabs/actions'

import styles from '../../../../styles/projects/overview/components/tabs/overview';
import { withStyles } from '@material-ui/core/styles';

import {
    Typography,
    Collapse
} from '@material-ui/core';
import AuthenticationDoughnutChart from './AuthenticationDoughnutChart';

import AddIcon from '@material-ui/icons/Add';

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, dispatchSetSelectedTab }: any = this.props;

        return (
            <div className={classes.body}>
                <div className={classes.title}>
                    <Typography
                        variant="h3"
                        component="h3"
                    >
                        Overview
                    </Typography>
                    <hr className={classes.titleDivider}/>
                </div>
                <div className={classes.content}>
                    <div className={classes.dropdownContainer}>
                        <div className={classes.dropdownTitle}>
                            <Typography
                                variant="body1"
                                component="p"
                            >
                                Authentication
                            </Typography>
                            <AddIcon/>
                        </div>
                        <Collapse
                            in={true}
                        >
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
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabs: state.tabs
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
)(Overview);