import { Component } from 'react';
import store from '../../../redux/projects/overview/store';
import { Provider } from 'react-redux';

import styles from '../../../styles/projects/overview/index';
import { withStyles } from '@material-ui/core/styles';

import ifAuth from '../../../hoc/ifAuth';
import Navbar from '../../../components/Navbar';
import ProjectOverviewBody from '../../../components/projects/overview/ProjectOverviewBody';

class ProjectOverview extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes }: any = this.props;
        return (
            <Provider store={store}>
                <div className={classes.root}>
                    <Navbar
                        category="Chameleo"
                        username="Benamon"
                    />
                    <ProjectOverviewBody/>
                </div>
            </Provider>
        )
    }
}

const AuthenticatedProjectOverview = ifAuth(ProjectOverview);
export default withStyles(styles)(AuthenticatedProjectOverview);