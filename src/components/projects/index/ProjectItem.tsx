import { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';

type ProjectItemProps = {
    title: string;
    project_id: string;
}

const ProjectItem: FunctionComponent<ProjectItemProps> = ({ title, project_id }) => {
    const classes = makeStyles(styles)();

    return (
        <Link href={`/projects/${project_id}`}>
            <div>
                <div className={classes.appItem}>
                    <div className={classes.appItemTitle}>{title}</div>
                    <div className={classes.appItemSubTitle}>Project ID: {project_id}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectItem;