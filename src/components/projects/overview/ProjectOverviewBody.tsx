import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../../redux/projects/overview/tabs/actions';
import { fetchAuthProjectDetails } from '../../../redux/projects/overview/project/actions';

import styles from '../../../styles/projects/overview/components/projectOverviewBody';
import { withStyles } from '@material-ui/core/styles';

import {
    Tabs,
    Tab
} from '@material-ui/core';
import TabPanel from '../../TabPanel';

import Overview from './tabs/Overview';
import Authentication from './tabs/Authentication';

class ProjectOverviewBody extends React.Component {
    constructor(props) {
        super(props);
        const { project, dispatchFetchAuthProjectDetails }: any = this.props;
        dispatchFetchAuthProjectDetails(project.project_id);
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
        dispatchFetchAuthProjectDetails: (project_id: string) => dispatch(fetchAuthProjectDetails(project_id))
    }
}

export default compose<any>(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ProjectOverviewBody);