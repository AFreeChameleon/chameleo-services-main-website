import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../../../../redux/projects/auth/new/tabs/actions';
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, } from '@material-ui/core';
import TabPanel from '../../../TabPanel';

import ErrorList from './ErrorList';
import UserModel from './UserModel';
import PasswordConfig from './PasswordConfig';
import AppSettings from './AppSettings';
import CreateProject from './CreateProject';
import OAuthSettings from './OAuthSettings';
import MailConfig from './MailConfig';

const styles = makeStyles({
    tab: {
        minWidth: '100px'
    }
});

const SetupTabs: FunctionComponent = () => {
    const classes = styles();
    const selectedTab = useSelector(state => state.tabs.selectedTab);
    const dispatch = useDispatch();
    return (
        <>
            <Tabs
                value={selectedTab}
                onChange={
                    (e, newVal) => dispatch(setSelectedTab(newVal))
                }
                indicatorColor="secondary"
                centered
            >
                <Tab label="Model" disableRipple className={classes.tab}/>
                <Tab label="Password" disableRipple className={classes.tab}/>
                <Tab label="Session" disableRipple className={classes.tab}/>
                <Tab label="Mail" disableRipple className={classes.tab}/>
                <Tab label="OAuth" disableRipple className={classes.tab}/>
                <Tab label="Summary" disableRipple className={classes.tab}/>
            </Tabs>
            <ErrorList/>
            <TabPanel value={selectedTab} index={0}>
                <UserModel/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <PasswordConfig/>
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
                <AppSettings/>
            </TabPanel>
            <TabPanel value={selectedTab} index={3}>
                <MailConfig/>
            </TabPanel>
            <TabPanel value={selectedTab} index={4}>
                <OAuthSettings/>
            </TabPanel>
            <TabPanel value={selectedTab} index={5}>
                <CreateProject/>
            </TabPanel>
        </>
    )
}

export default SetupTabs;