import { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ifAuth from '../../hoc/ifAuth';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/projects/index';

import Navbar from '../../components/Navbar';
import ProjectList from '../../components/projects/index/ProjectList'
import {
    Add as AddIcon,
    List as ListIcon,
    Apps as AppsIcon,
    FormatListBulleted as FormatListBulletedIcon
} from '@material-ui/icons';

const Projects: FunctionComponent = () => {
    const classes = makeStyles(styles)();
    const router = useRouter();
    const [listView, setListView] = useState('apps');
    return (
        <div className={classes.root}>
            <Navbar
                category="Chameleo"
                username="Benamon"
            />
            <div className={classes.body}>
                <div className={classes.title}>Projects</div>
                <div className={classes.changeListView}>
                    <AppsIcon 
                        className={listView === 'apps' ? classes.changeListItemSelected : classes.changeListItem}
                        onClick={(e) => {
                            setListView('apps');
                        }}
                    />
                    <FormatListBulletedIcon 
                        className={listView === 'list' ? classes.changeListItemSelected : classes.changeListItem}
                        onClick={(e) => {
                            setListView('list');
                        }}
                    />
                </div>
                <ProjectList listView={listView} />
                <div className={classes.title}>
                    Or...
                </div>
                <div className={classes.createNewProject}>
                    <Link href="/projects/auth/new">
                        <div className={classes.createNewProjectButton}>
                            <div className={classes.createNewProjectButtonTitle}>
                                Create New Project
                            </div>
                            <div className={classes.createNewProjectButtonIcon}>
                                <AddIcon/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const AuthenticatedProjects = ifAuth(Projects);
export default AuthenticatedProjects;