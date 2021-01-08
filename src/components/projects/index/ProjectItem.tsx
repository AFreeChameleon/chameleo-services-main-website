import { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';

import ProjectSecretModal from './ProjectSecretModal';

type ProjectItemProps = {
    title: string;
    project_id: string;
}

const ProjectItem: FunctionComponent<ProjectItemProps> = ({ title, project_id }) => {
    const classes = makeStyles(styles)();
    const project = useSelector(state => state.project);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)

    return (
        // <Link href={`/projects/${project_id}`}>
        <>
        <div onClick={(e) => setModalOpen(true)}>
            <div className={classes.appItem}>
                <div className={classes.appItemTitle}>{title}</div>
                <div className={classes.appItemSubTitle}>Project ID: {project_id}</div>
            </div>
        </div>
        <ProjectSecretModal
            open={modalOpen}
            onClose={(e) => setModalOpen(false)}
            projectId={project_id}
        />
        </>
        // </Link>
    )
}

export default ProjectItem;