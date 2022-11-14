import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { API_URL } from '../../../../../globals';
import ifAuth from '../../../../../hoc/ifAuth';
import store from '../../../../../redux/store';
import LeftSidebar from '../../../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../../../components/dashboard/header/Header';
import AuthContainerLogs from '../../../../../components/dashboard/auth/container/logs/AuthContainerLogs';
import LoggingWebsocket from '../../../../../lib/container/auth/ws_client';

import classes from '../../Dashboard.module.scss';

function ContainerLogs({ container_id }) {
    const [logs, setLogs] = useState([]);
    const [ws, setWs] = useState(null);
    
    useEffect(() => {
        setWs(new LoggingWebsocket(container_id, setLogs));
    }, []);

    return (
        <Provider store={store}>
            <div className={classes.root}>
                <LeftSidebar selectedTab="authentication" containerId={container_id} />
                <div>
                    <Header/>
                    <AuthContainerLogs containerId={container_id} apiUrl={API_URL} logs={logs}/>
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