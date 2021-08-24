import React from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import store from '../../../redux/store';
import ifAuth from '../../../hoc/ifAuth';
import LeftSidebar from '../../../components/dashboard/left_sidebar/LeftSidebar';
import EditAuthContainerBody from '../../../components/dashboard/auth/EditAuthContainerBody';

class EditAuthContainer extends React.Component<{ classes?: any }> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
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

const styles = (): any => ({
    root: {
        height: '100vh', 
        display: 'grid', 
        gridTemplateColumns: '280px auto'
    }
})

const AuthenticatedEditAuthContainer = ifAuth(EditAuthContainer);
export default withStyles(styles)(AuthenticatedEditAuthContainer);