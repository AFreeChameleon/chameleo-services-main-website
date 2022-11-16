import React from 'react';
import { Provider } from 'react-redux';
import ifAuth from '../../../../../hoc/ifAuth';
import store from '../../../../../redux/store';
import AuthContainerBody from '../../../../../components/dashboard/auth/container/AuthContainerBody';
import LeftSidebar from '../../../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../../../components/dashboard/header/Header';
import { API_URL } from '../../../../../globals';

import classes from '../../../Dashboard.module.scss';

function ContainerOne({ container_id }) {
    return (
        <Provider store={store}>
            <div className={classes.root}>
                <LeftSidebar selectedTab="authentication" containerId={container_id} />
                <div>
                    <Header/>
                    <AuthContainerBody containerId={container_id} apiUrl={API_URL}/>
                </div>
            </div>
        </Provider>
    )
}

ContainerOne.getInitialProps = async (ctx) => {
    const { query } = ctx;
    return {
        container_id: query.container_id
    }
}

const AuthenticatedContainerOne = ifAuth(ContainerOne);
export default AuthenticatedContainerOne;