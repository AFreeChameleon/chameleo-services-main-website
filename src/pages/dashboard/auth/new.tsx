import React from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import store from '../../../redux/store';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import NewAuthContainerBody from '../../../components/dashboard/auth/NewAuthContainerBody';

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
                    <NewAuthContainerBody/>
                </div>
            </Provider>
        )
    }
}

const styles = (): any => ({
    root: {
        height: '100vh', 
        display: 'grid', 
        gridTemplateColumns: '100px auto'
    }
})

const AuthenticatedNewAuthContainer = ifAuth(NewAuthContainer);
export default withStyles(styles)(AuthenticatedNewAuthContainer);