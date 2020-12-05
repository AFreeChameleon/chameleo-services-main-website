import axios, { AxiosResponse, AxiosError } from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';

import ProjectItem from './ProjectItem';

const ProjectList: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();
    return (
        <div className={project.listView === 'apps' ? classes.appList : classes.rowList}>
            { project.projects.list.map((proj, i) => (
                <ProjectItem
                    key={i}
                    title={proj.project_name}
                    project_id={proj.project_id}
                />
            )) }

        </div>
    )
}

export default ProjectList;