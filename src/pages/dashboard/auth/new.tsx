import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../components/dashboard/header/Header';
import NewAuthContainerBody from '../../../components/dashboard/auth/create/CreateContainerBody';
import ErrorList from '../../../components/ErrorList';

import classes from '../Dashboard.module.scss';

class NewAuthContainer extends React.Component<{ classes?: any }> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <LeftSidebar selectedTab={'authentication'} />
                    <div>
                        <Header/>
                        <NewAuthContainerBody/>
                    </div>
                </div>
                <ErrorList/>
            </Provider>
        )
    }
}

const AuthenticatedNewAuthContainer = ifAuth(NewAuthContainer);
export default AuthenticatedNewAuthContainer;