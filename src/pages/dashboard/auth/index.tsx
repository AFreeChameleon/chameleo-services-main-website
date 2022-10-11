import { Component } from 'react';
import store from '../../../redux/store';
import { Provider } from 'react-redux';
import AuthenticationMain from '../../../components/dashboard/auth/AuthenticationMain';
import ifAuth from '../../../hoc/ifAuth';
import { withStyles } from '@material-ui/core';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import RightSidebar from '../../../components/dashboard/right_sidebar/RightSidebar';
import { API_URL } from '../../../globals';

class AuthDashboard extends Component<{ classes?: any; }> {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes } = this.props;

        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <LeftSidebar selectedTab="authentication" />
                    <AuthenticationMain />
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
        gridTemplateColumns: '280px auto 300px'
    }
});

const AuthenticatedAuthDashboard = ifAuth(AuthDashboard);
export default withStyles(styles)(AuthenticatedAuthDashboard);