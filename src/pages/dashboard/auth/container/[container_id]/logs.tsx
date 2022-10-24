import React from 'react';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { API_URL } from '../../../../../globals';
import ifAuth from '../../../../../hoc/ifAuth';
import store from '../../../../../redux/store';
import LeftSidebar from '../../../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../../../components/dashboard/header/Header';
import AuthContainerLogs from '../../../../../components/dashboard/auth/container/logs/AuthContainerLogs';

const styles = {
    root: {
        height: '100vh', 
        display: 'grid', 
        gridTemplateColumns: '280px auto'
    }
}

function ContainerLogs({ container_id }) {
    const classes = makeStyles(styles)();
    return (
        <Provider store={store}>
            <div className={classes.root}>
                <LeftSidebar selectedTab="authentication" containerId={container_id} />
                <div>
                    <Header/>
                    <AuthContainerLogs containerId={container_id} apiUrl={API_URL}/>
                </div>
            </div>
        </Provider>
    )
}

ContainerLogs.getInitialProps = async (ctx) => {
    const { query } = ctx;
    return {
        container_id: query.container_id
    }
}

const AuthenticatedContainerLogs = ifAuth(ContainerLogs);
export default AuthenticatedContainerLogs;