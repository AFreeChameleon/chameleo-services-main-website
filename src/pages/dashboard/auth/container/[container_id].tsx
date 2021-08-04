import React from 'react';
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ifAuth from '../../../../hoc/ifAuth';
import store from '../../../../redux/store';
import AuthContainerBody from '../../../../components/dashboard/auth/container/AuthContainerBody';
import LeftSidebar from '../../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../../components/dashboard/header/Header';

const styles = {
    root: {
        height: '100vh', 
        display: 'flex', 
    }
}

function ContainerOne({ container_id }) {
    const classes = makeStyles(styles)();
    return (
        <Provider store={store}>
            <div className={classes.root}>
                <LeftSidebar selectedTab="authentication" containerId={container_id} />
                <div>
                    <Header/>
                    <AuthContainerBody containerId={container_id}/>
                </div>
            </div>
        </Provider>
    )
}

ContainerOne.getInitialProps = async ({ query }) => {
    return {
        container_id: query.container_id
    }
}

const AuthenticatedContainerOne = ifAuth(ContainerOne);
export default AuthenticatedContainerOne;