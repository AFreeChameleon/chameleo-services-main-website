import { FunctionComponent, useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';

import ProjectItem from './ProjectItem';

type ProjectListProps = {
    listView: string;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ listView }) => {
    const classes = makeStyles(styles)();
    let [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.post(`http://localhost:8080/api/projects/all`, {}, {
            withCredentials: true
        })
        .then((res: AxiosResponse) => {
            setProjects(res.data.projects);
        })
        .catch((err: AxiosError) => {
            console.log(err.response)
        })
    }, [])

    return (
        <div className={listView === 'apps' ? classes.appList : classes.rowList}>
            { projects.map((project) => (
                <ProjectItem 
                    listView={listView}
                    title={project.title}
                    appid={project.appid}
                />
            )) }

        </div>
    )
}

export default ProjectList;