import React from 'react';
import Image from 'next/image';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchContainers
} from '../../../redux/container/actions';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import AddIcon from '@material-ui/icons/Add';
import ChameleoLogo from '../../../img/chameleo-logo.png';
import { DatabaseIcon, AuthIcon, DashboardIcon, ExitIcon } from '../../Icons';

type LeftSidebarProps = {
    classes: any;
    containers: any[];
    containerId: string;
    selectedTab: 'dashboard' | 'authentication' | 'database';
    dispatchFetchContainers: () => void;
}

type LeftSidebarState = {
    authDropdownOpen: boolean;
    dbDropdownOpen: boolean;
}

class LeftSidebar extends React.Component<LeftSidebarProps, LeftSidebarState> {
    constructor(props) {
        super(props);
        const { selectedTab, dispatchFetchContainers } = this.props;
        dispatchFetchContainers();
        this.state = {
            authDropdownOpen: selectedTab === 'authentication',
            dbDropdownOpen: selectedTab === 'database',
        }
    }

    render() {
        const { classes, selectedTab, containers, containerId } = this.props;
        const { authDropdownOpen, dbDropdownOpen } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.profilePicture}>
                        <Link href="/">
                            <Image 
                                src={ChameleoLogo} 
                                alt="Chameleo"
                                width={150}
                                height={38}
                                className={classes.chameleoLogo} 
                                layout="fixed"
                            />
                        </Link>
                    </div>
                    <Link href="/dashboard" className={classes.link}>
                        <div 
                            className={`${classes.sidebarItem} ${selectedTab === 'dashboard' ? classes.sidebarItemSelected : ''}`}
                        >
                            <DashboardIcon className={`${classes.smallIcon} ${selectedTab === 'dashboard' && classes.sidebarIconSelected}`} /> 
                            <Typography
                                variant="body1"
                                className={classes.selectedText}
                            >
                                Dashboard
                            </Typography>
                        </div>
                    </Link>
                    <div 
                        className={`${classes.sidebarItem} ${authDropdownOpen && classes.sidebarItemSelected}`} 
                        onClick={(e) => this.setState({ authDropdownOpen: !authDropdownOpen })}
                    >
                        <AuthIcon className={`${classes.smallIcon} ${selectedTab === 'authentication' && classes.sidebarIconSelected}`} />
                        <Typography
                            className={classes.selectedText}
                            style={{paddingTop: '3px'}}
                        >
                            Authentication
                        </Typography>
                        <div className={classes.flexGrow}></div>
                        <ExpandMoreIcon className={`${classes.expandIcon} ${authDropdownOpen && classes.inverted}`} />
                    </div>
                    <Collapse in={authDropdownOpen}>
                        { containers.filter(c => c.type === 'auth').map((c: any, i) => {console.log(c); return (
                            <Link href={`/dashboard/auth/container/${encodeURI(c.id)}`} key={i} className={classes.link}>
                                <div className={`${classes.sidebarItem} ${(c.id == containerId) && classes.sidebarListItemSelected}`}>
                                    <div className={classes.smallIcon}>&#8226;</div>
                                    <Typography className={`${(c.id == containerId) && classes.sidebarListItemTextSelected}`}>
                                        {c.name}
                                    </Typography>
                                </div>
                            </Link>
                        )}) }
                        <Link href="/dashboard/auth/new" className={classes.link}>
                            <div className={classes.sidebarItem}>
                                <AddIcon className={classes.smallIcon} />
                                <Typography>
                                    Create New Container
                                </Typography>
                            </div>
                        </Link>
                    </Collapse>
                    <div
                        className={`${classes.sidebarItem} ${dbDropdownOpen && classes.sidebarItemSelected}`} 
                        onClick={(e) => this.setState({ dbDropdownOpen: !dbDropdownOpen })}
                    >
                        <DatabaseIcon className={`${classes.smallIcon} ${selectedTab === 'database' && classes.sidebarIconSelected}`} />
                        <Typography
                            className={classes.selectedText}
                            style={{paddingTop: '3px'}}
                        >
                            Database
                        </Typography>
                        <div className={classes.flexGrow}></div>
                        <ExpandMoreIcon className={`${classes.expandIcon} ${dbDropdownOpen && classes.inverted}`} />
                    </div>
                    <Collapse in={dbDropdownOpen}>
                        { containers.filter(c => c.type === 'database').map((c: any, i) => {console.log(c); return (
                            <Link href={`/dashboard/database/${encodeURI(c.name)}`} key={i} className={classes.link}>
                                <div className={classes.sidebarItem}>
                                    <div className={classes.smallIcon}>&#8226;</div>
                                    <Typography>
                                        {c.name}
                                    </Typography>
                                </div>
                            </Link>
                        )}) }
                        <Link href="/dashboard/database/new" className={classes.link}>
                            <div className={classes.sidebarItem}>
                                <AddIcon className={classes.smallIcon} />
                                <Typography>
                                    Create New Container
                                </Typography>
                            </div>
                        </Link>
                    </Collapse>
                </div>
            </div>
        )
    }
}

const styles = withStyles((theme: any) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.grey.A200}`,
        width: '279px',
        height: '100%',
    },
    profilePicture: {
        height: '140px',
        display: 'grid',
        alignItems: 'center',
        paddingLeft: '20px'
    },
    link: {
        textDecoration: 'none'
    },
    chameleoLogo: {
        cursor: 'pointer',
    },
    sidebarItem: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        color: theme.palette.text.primary,
        columnGap: '10px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        borderBottom: `1px solid transparent`,
        '&:hover': {
            color: theme.palette.primary.main
        },
        '&:hover svg path': {
            fill: theme.palette.primary.main
        }
    },
    sidebarItemSelected: {
        borderBottom: `1px solid ${theme.palette.grey['50']}`
    },
    sidebarListItemSelected: {
        backgroundColor: theme.palette.background.light
    },
    sidebarListItemIconSelected: {
        '& > path': {
            fill: '#000000'
        }
    },
    sidebarListItemTextSelected: {
        color: '#000000',
        fontWeight: 600
    },
    sidebarIconSelected: {
        '& > path': {
            fill: "#00AF55"
        }
    },
    smallIcon: {
        width: '20px',
        textAlign: 'center'
    },
    createContainer: {
        display: 'flex'
    },
    selectedText: {
        fontWeight: 600,
        fontSize: '16px'
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
    expandIcon: {
        paddingTop: '3px',
        transition: '0.2s'
    },
    inverted: {
        transform: 'rotate(180deg)'
    },
    selected: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.light,
        '& svg path': {
            fill: theme.palette.primary.main
        }
    },
    container: {
        position: 'fixed',
        width: '279px'
    }
}))

const mapStateToProps = state => ({
    containers: state.containers.containers
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchContainers: () => dispatch(fetchContainers())
});

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    styles
)(LeftSidebar);