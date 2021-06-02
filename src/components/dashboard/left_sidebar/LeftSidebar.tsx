import React from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import { DatabaseIcon, AuthIcon, DashboardIcon, ExitIcon } from '../../Icons';

type LeftSidebarProps = {
    selectedTab: 'dashboard' | 'authentication' | 'database';
}

class LeftSidebar extends React.Component<LeftSidebarProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, selectedTab }: any = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.profilePicture}></div>
                <Link href="/dashboard">
                    <div 
                        className={`${classes.icon} ${selectedTab === 'dashboard' ? classes.selected : ''}`}
                    >
                        <DashboardIcon/>
                    </div>
                </Link>
                <Link href="/dashboard/database">
                    <div 
                        className={`${classes.icon} ${selectedTab === 'database' ? classes.selected : ''}`}
                    >
                        <DatabaseIcon/>
                    </div>
                </Link>
                <Link href="/dashboard/auth">
                    <div 
                        className={`${classes.icon} ${selectedTab === 'authentication' ? classes.selected : ''}`}
                    >
                        <AuthIcon/>
                    </div>
                </Link>
                <div className={classes.flexGrow}></div>
                <div className={classes.icon}>
                    <ExitIcon/>
                </div>
            </div>
        )
    }
}

const styles: any = () => ({
    root: {
        backgroundColor: '#2C2C2C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    profilePicture: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#D1FFD9',
        border: '2px solid #51C85D',
        margin: '20px 0 40px 0'
    },
    icon: {
        padding: '10px',
        marginBottom: '20px',
        height: '50px',
        width: '50px',
        borderRadius: '10px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover svg path': {
            fill: '#ffffff'
        }
    },
    flexGrow: {
        flexGrow: 1
    },
    selected: {
        backgroundColor: '#51C85D',
        '& svg path': {
            fill: '#ffffff'
        }
    }
});

export default withStyles(styles)(LeftSidebar);