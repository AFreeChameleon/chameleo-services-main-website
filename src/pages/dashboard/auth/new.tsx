import React from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import store from '../../../redux/store';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import Header from '../../../components/dashboard/header/Header';
import NewAuthContainerBody from '../../../components/dashboard/auth/create/CreateContainerBody';
import ErrorList from '../../../components/ErrorList';

class NewAuthContainer extends React.Component<{ classes?: any }> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
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

const styles = (): any => ({
    root: {
        height: '100vh', 
        display: 'grid', 
        gridTemplateColumns: '280px auto'
    }
})

const AuthenticatedNewAuthContainer = ifAuth(NewAuthContainer);
export default withStyles(styles)(AuthenticatedNewAuthContainer);