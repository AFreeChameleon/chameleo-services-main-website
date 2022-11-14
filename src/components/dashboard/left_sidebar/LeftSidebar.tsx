import React from 'react';
import Image from 'next/image';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchContainers
} from '../../../redux/container/actions';
import Link from 'next/link';
import {
    Typography,
    Collapse,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import AddIcon from '@mui/icons-material/Add';
import ChameleoLogo from '../../../img/chameleo-logo.png';
import { DatabaseIcon, AuthIcon, DashboardIcon, ExitIcon } from '../../Icons';

import classes from './LeftSidebar.module.scss';

type LeftSidebarProps = {
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
        const { selectedTab, containers, containerId } = this.props;
        const { authDropdownOpen, dbDropdownOpen } = this.state;
        return (
            <Box 
                sx={{ 
                    backgroundColor: 'background.default', 
                    border: (theme) => `1px solid ${theme.palette.grey.A200}` 
                }}
                className={classes.root}
            >
                <div className={classes.container}>
                    <div className={classes.profilePicture}>
                        <Link href="/">
                            <Image 
                                src={ChameleoLogo} 
                                alt="Chameleo"
                                width={150}
                                height={38}
                                className={classes.chameleoLogo} 
                                // layout="fixed"
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
                    <Box 
                        sx={{ 
                            color: 'text.primary', 
                            '&:hover': {
                                color: 'primary.main'
                            },
                            '&:hover svg path': {
                                fill: (theme) => theme.palette.primary.main
                            },
                            borderBottom: (theme) => authDropdownOpen &&
                                `1px solid ${theme.palette.grey['50']}` 
                        }}
                        className={`${classes.sidebarItem}`} 
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
                    </Box>
                    <Collapse in={authDropdownOpen}>
                        { containers.filter(c => c.type === 'auth').map((c: any, i) => (
                            <Link href={`/dashboard/auth/container/${encodeURI(c.id)}`} key={i} className={classes.link}>
                                <Box
                                    sx={{ backgroundColor: (theme) => (c.id == containerId) && 'background.light' }}
                                    className={`${classes.sidebarItem}`}
                                >
                                    <div className={classes.smallIcon}>&#8226;</div>
                                    <Typography className={`${(c.id == containerId) && classes.sidebarListItemTextSelected}`}>
                                        {c.name}
                                    </Typography>
                                </Box>
                            </Link>
                        )) }
                        <Link href="/dashboard/auth/new" className={classes.link}>
                            <div className={classes.sidebarItem}>
                                <AddIcon className={classes.smallIcon} />
                                <Typography>
                                    Create New Container
                                </Typography>
                            </div>
                        </Link>
                    </Collapse>
                    <Box
                        sx={{ 
                            color: 'text.primary', 
                            '&:hover': {
                                color: 'primary.main'
                            },
                            '&:hover svg path': {
                                fill: (theme) => theme.palette.primary.main
                            },
                            borderBottom: (theme) => authDropdownOpen &&
                                `1px solid ${theme.palette.grey['50']}` 
                        }}
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
                    </Box>
                    <Collapse in={dbDropdownOpen}>
                        { containers.filter(c => c.type === 'database').map((c: any, i) => (
                            <Link href={`/dashboard/database/${encodeURI(c.name)}`} key={i} className={classes.link}>
                                <div className={classes.sidebarItem}>
                                    <div className={classes.smallIcon}>&#8226;</div>
                                    <Typography>
                                        {c.name}
                                    </Typography>
                                </div>
                            </Link>
                        )) }
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
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    containers: state.containers.containers
});

const mapDispatchToProps = dispatch => ({
    dispatchFetchContainers: () => dispatch(fetchContainers())
});

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
)(LeftSidebar);