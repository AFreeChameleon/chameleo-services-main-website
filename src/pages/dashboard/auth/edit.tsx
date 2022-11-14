import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import EditAuthContainerBody from '../../../components/dashboard/auth/EditAuthContainerBody';

import classes from '../Dashboard.module.scss';

class EditAuthContainer extends React.Component<{ classes?: any }> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <LeftSidebar selectedTab={'authentication'} />
                    <EditAuthContainerBody/>
                </div>
            </Provider>
        )
    }
}

const AuthenticatedEditAuthContainer = ifAuth(EditAuthContainer);
export default AuthenticatedEditAuthContainer;