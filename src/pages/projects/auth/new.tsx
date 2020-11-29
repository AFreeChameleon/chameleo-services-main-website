import { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/projects/auth/new/store';
import ifAuth from '../../../hoc/ifAuth';

import { withStyles } from '@material-ui/core/styles';
import createNewProjectStyles from '../../../styles/projects/auth/new/createNewProjectStyles'; 

import Navbar from '../../../components/Navbar';
import TabButtons from '../../../components/projects/auth/new/TabButtons';
import SetupTabs from '../../../components/projects/auth/new/SetupTabs';

class CreateNewProject extends Component<any, any> { 
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
    }

    render() {
        const {
            classes,
        }: any = this.props;

        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <Navbar
                        category="Chameleo"
                        username="Benamon"
                    />
                    <div className={classes.inner}>
                        <SetupTabs/>
                        <TabButtons/>
                    </div>
                </div>
            </Provider>
        )
    }
}

const AuthenticatedCreateNewProject = ifAuth(CreateNewProject);
export default withStyles(createNewProjectStyles)(AuthenticatedCreateNewProject)
