import {  Component } from 'react';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import ifAuth from '../../hoc/ifAuth';
import { withStyles } from '@material-ui/core';
import LeftSidebar from '../../components/dashboard/left_sidebar/LeftSidebar';
import DashboardMain from '../../components/dashboard/main/DashboardMain';
import RightSidebar from '../../components/dashboard/right_sidebar/RightSidebar';

class Dashboard extends Component<{ classes?: any }> {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes } = this.props;

        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <LeftSidebar selectedTab="dashboard" />
                    <DashboardMain/>
                    <RightSidebar/>
                </div>
            </Provider>
        )
    }
}

const styles = (): any => ({
    root: {
        height: '100vh', 
        display: 'grid', 
        gridTemplateColumns: '100px auto 300px'
    }
})

const AuthenticatedDashboard = ifAuth(Dashboard);
export default withStyles(styles)(AuthenticatedDashboard);