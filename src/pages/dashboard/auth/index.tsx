import { Component } from 'react';
import store from '../../../redux/store';
import { Provider } from 'react-redux';
import AuthenticationMain from '../../../components/dashboard/auth/AuthenticationMain';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import RightSidebar from '../../../components/dashboard/right_sidebar/RightSidebar';
import { API_URL } from '../../../globals';

import { Box } from '@mui/material';

import classes from '../Dashboard.module.scss';

class AuthDashboard extends Component<{ classes?: any; }> {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <Provider store={store}>
                <Box 
                    className={classes.root} 
                    sx={{ gridTemplateColumns: '280px auto 300px' }}
                >
                    <LeftSidebar selectedTab="authentication" />
                    <AuthenticationMain />
                    <RightSidebar/>
                </Box>
            </Provider>
        )
    }
}

const AuthenticatedAuthDashboard = ifAuth(AuthDashboard);
export default AuthenticatedAuthDashboard;