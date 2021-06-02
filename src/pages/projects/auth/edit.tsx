import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/projects/auth/edit/store';
import {
    setProjectValue
} from '../../../redux/projects/auth/edit/project/actions';
import ifAuth from '../../../hoc/ifAuth';

import styles from '../../../styles/projects/auth/edit/index';
import { withStyles } from '@material-ui/core/styles';

import Navbar from '../../../components/Navbar';
import EditAuthContainerBody from '../../../components/projects/auth/edit/EditAuthContainerBody';

class EditAuthContainer extends Component {
    static async getInitialProps(ctx) {
        return { project_id: ctx.query.project_id }
    }

    constructor(props) {
        super(props);
        const { project_id }: any = this.props;
        store.dispatch(setProjectValue('project_id', project_id));
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
                    <div className={classes.inner}>
                        <EditAuthContainerBody/>
                    </div>
                </div>
            </Provider>
        )
    }
}

const AuthenticatedEditAuthContainer = ifAuth(EditAuthContainer);
export default withStyles(styles)(AuthenticatedEditAuthContainer);