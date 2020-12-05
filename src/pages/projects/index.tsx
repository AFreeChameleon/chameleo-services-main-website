import axios, { AxiosResponse, AxiosError } from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/projects/index/store';
import ifAuth from '../../hoc/ifAuth';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/projects/index';

import Navbar from '../../components/Navbar';
import ProjectsBody from '../../components/projects/index/ProjectsBody'

const Projects: FunctionComponent = () => {
    const classes = makeStyles(styles)();

    return (
        <Provider store={store}>
            <div className={classes.root}>
                <Navbar
                    category="Chameleo"
                    username="Benamon"
                />
                <ProjectsBody/>
            </div>
        </Provider>
    )
}

const AuthenticatedProjects = ifAuth(Projects);
export default AuthenticatedProjects;