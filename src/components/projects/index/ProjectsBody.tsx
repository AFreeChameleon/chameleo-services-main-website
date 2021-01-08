import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectSetValue, projectFetchProjects } from '../../../redux/projects/index/project/actions';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/index';

import ProjectList from './ProjectList';
import NewProjectModal from './NewProjectModal';
import {
    Button,
    Typography
} from '@material-ui/core';

import {
    Add as AddIcon,
    Apps as AppsIcon,
    FormatListBulleted as FormatListBulletedIcon
} from '@material-ui/icons';

const ProjectsBody: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(projectFetchProjects());
    }, []);

    return (
        <div className={classes.body}>
            <div>
                <Typography
                    variant="h4"
                    component="h4"
                >
                    Projects
                </Typography>
                <hr/>
            </div>
            <ProjectList />
            <NewProjectModal/>
        </div>
    )
}

export default ProjectsBody;