import { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/projects/index/components/ProjectList';

type ProjectItemProps = {
    listView: string;
    title: string;
    appid: string;
}

const ProjectItem: FunctionComponent<ProjectItemProps> = ({ listView, title, appid }) => {
    const classes = makeStyles(styles)();

    return listView === 'apps' ? (
        <div className={classes.appItem}>
            <div className={classes.appItemTitle}>{status}</div>
            <div className={classes.appItemSubTitle}>App ID: {appid}</div>
            <div className={classes.appItemSubTitle}>Containers</div>
            {/* <div className={classes.appItemSubTitle}>Status: {status}</div> */}
        </div>
    ) : (
        <div className={classes.rowItem}>
            <div className={classes.rowItemTitle}>{title}</div>
            <div className={classes.rowItemSubTitle}>App ID: {appid}</div>
            <div className={classes.rowItemSubTitle}>Containers</div>
            {/* <div className={classes.rowItemSubTitle}>Status: {status}</div> */}
        </div>
    )
}

export default ProjectItem;