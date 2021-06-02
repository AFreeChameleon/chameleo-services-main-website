import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../redux/projects/overview/tabs/actions';
import { fetchProjectDetails } from '../../../redux/projects/overview/project/actions';

import styles from '../../../styles/projects/overview/components/projectOverviewBody';
import { withStyles } from '@material-ui/core/styles';

import {
    Tabs,
    Tab
} from '@material-ui/core';
import TabPanel from '../../TabPanel';

import Overview from './tabs/Overview';
import Authentication from './tabs/authentication/Authentication';

class ProjectOverviewBody extends React.Component {
    constructor(props) {
        super(props);
        const { project, dispatchFetchProjectDetails }: any = this.props;
        dispatchFetchProjectDetails(project.project_id);
    }

    render() {
        const { classes, tabs, project, dispatchSetSelectedTab }: any = this.props;
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
                        <TabPanel value={selectedTab} index={1}>
                            <Authentication/>
                        </TabPanel>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
        project: state.project
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
)(ProjectOverviewBody);