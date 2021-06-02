import { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/projects/auth/new/store';
import {
    setProjectValue,
} from '../../../redux/projects/auth/new/project/actions';
import ifAuth from '../../../hoc/ifAuth';

import { withStyles } from '@material-ui/core/styles';
import createNewProjectStyles from '../../../styles/projects/auth/new/createNewProjectStyles'; 

import Navbar from '../../../components/Navbar';
import NewAuthContainerBody from '../../../components/projects/auth/new/NewAuthContainerBody';

class CreateAuthContainer extends Component<any, any> {
    static async getInitialProps(ctx) {
        // return { project_id: ctx.query.project_id }
    }

    constructor(props) {
        super(props);
        // const { project_id }: any = this.props;
        // store.dispatch(setProjectValue('project_id', project_id!));
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
                        <NewAuthContainerBody/>
                    </div>
                </div>
            </Provider>
        )
    }
}

const AuthenticatedCreateAuthContainer = ifAuth(CreateAuthContainer);
export default withStyles(createNewProjectStyles)(AuthenticatedCreateAuthContainer)
