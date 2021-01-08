import axios, { AxiosResponse, AxiosError } from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectSetValue, projectFetchProjects } from '../../../redux/projects/index/project/actions';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';
import {
    Add as AddIcon,
} from '@material-ui/icons';

import {
    Button
} from '@material-ui/core';
import ProjectItem from './ProjectItem';

const ProjectList: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();
    return (
        <div className={classes.appList}>
            { project.projects.list.map((proj, i) => (
                <ProjectItem
                    key={i}
                    title={proj.project_name}
                    project_id={proj.project_id}
                />
            )) }
            <Button 
                onClick={(e) => dispatch(projectSetValue('newProjectModalOpen', true))}
                variant="outlined"
                color="secondary"
                size="large"
            >
                <AddIcon/>
            </Button>
        </div>
    )
}

export default ProjectList;