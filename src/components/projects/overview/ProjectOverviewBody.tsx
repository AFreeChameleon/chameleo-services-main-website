import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../redux/projects/overview/tabs/actions'

import styles from '../../../styles/projects/overview/components/projectOverviewBody';
import { withStyles } from '@material-ui/core/styles';

import {
    Tabs,
    Tab
} from '@material-ui/core';
import TabPanel from '../../TabPanel';

import Overview from './tabs/Overview';

class ProjectOverviewBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, tabs, dispatchSetSelectedTab }: any = this.props;
        const selectedTab = tabs.selectedTab;

        return (
            <div className={classes.root}>
                <div className={classes.body}>
                    <div className={classes.sidebarContainer}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={selectedTab}
                            onChange={(e, newValue) => 
                                dispatchSetSelectedTab(newValue)
                            }
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Overview" />
                            <Tab label="Authentication" />
                        </Tabs>
                    </div>
                    <div className={classes.bodyContent}>
                        <TabPanel value={selectedTab} index={0}>
                            <Overview/>
                        </TabPanel>
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
)(ProjectOverviewBody);