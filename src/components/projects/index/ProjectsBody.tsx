import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectSetValue, projectFetchProjects } from '../../../redux/projects/index/project/actions';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/index';

import ProjectList from './ProjectList';
import NewProjectModal from './NewProjectModal';
import {
    Button
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
            <div className={classes.title}>Projects</div>
            <div className={classes.changeListView}>
                <AppsIcon 
                    className={project.listView === 'apps' ? classes.changeListItemSelected : classes.changeListItem}
                    onClick={(e) => {
                        dispatch(projectSetValue('listView', 'apps'));
                    }}
                />
                <FormatListBulletedIcon 
                    className={project.listView === 'list' ? classes.changeListItemSelected : classes.changeListItem}
                    onClick={(e) => {
                        dispatch(projectSetValue('listView', 'list'));
                    }}
                />
            </div>
            <ProjectList />
            <div className={classes.title}>
                Or...
            </div>
            <div className={classes.createNewProject}>
                <Button 
                    onClick={(e) => dispatch(projectSetValue('newProjectModalOpen', true))}
                    startIcon={<AddIcon/>}
                    variant="contained"
                    color="secondary"
                    size="large"
                >
                    Create New Project
                </Button>
            </div>
            <NewProjectModal/>
        </div>
    )
}

export default ProjectsBody;