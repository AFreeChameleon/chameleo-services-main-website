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

function DropdownBox({ down, setDown, selectedTab, title }) {
    return (
        <Box 
            sx={{ 
                color: down ? 'primary.main' : 'text.primary', 
                '& svg path': down && {
                    fill: (theme) => theme.palette.primary.main
                },
                '&:hover': {
                    color: 'primary.main',
                    backgroundColor: (theme) => theme.palette.grey['50']
                },
                '&:hover svg path': {
                    fill: (theme) => theme.palette.primary.main
                },
                borderBottom: (theme) => down &&
                    `1px solid ${theme.palette.grey['50']} !important` 
            }}
            className={`${classes.sidebarItem}`} 
            onClick={setDown}
        >
            <AuthIcon className={`${classes.smallIcon} ${selectedTab && classes.sidebarIconSelected}`} />
            <Typography
                className={classes.selectedText}
                style={{paddingTop: '3px'}}
            >
                {title}
            </Typography>
            <div className={classes.flexGrow}></div>
            <ExpandMoreIcon className={`${classes.expandIcon} ${down && classes.inverted}`} />
        </Box>
    )
}

function CreateNewLink({ href, Icon }) {
    return (
        <Link href={href} className={classes.link}>
            <Box 
                className={classes.sidebarItem}
                sx={{ 
                    borderBottom: (theme) => '1px solid ' + theme.palette.grey['50'] + ' !important',
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.grey['50']
                    },
                }}
            >
                <Icon className={classes.smallIcon} />
                <Typography>
                    Create New Container
                </Typography>
            </Box>
        </Link>
    )
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
                    borderRight: (theme) => `1px solid ${theme.palette.grey.A200}` 
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
                    <DropdownBox 
                        down={authDropdownOpen} 
                        setDown={() => this.setState({ authDropdownOpen: !authDropdownOpen })} 
                        selectedTab={selectedTab === 'authentication'}
                        title="Authentication"
                    />
                    <Collapse in={authDropdownOpen}>
                        { containers.filter(c => c.type === 'auth').map((c: any, i) => (
                            <Link href={`/dashboard/auth/container/${encodeURI(c.id)}`} key={i} className={classes.link}>
                                <Box
                                    sx={{ 
                                        backgroundColor: (theme) => (c.id == containerId) && 'background.light',
                                        '&:hover': {
                                            backgroundColor: (theme) => theme.palette.grey['50']
                                        }
                                    }}
                                    className={`${classes.sidebarItem}`}
                                >
                                    <div className={classes.smallIcon}>&#8226;</div>
                                    <Typography className={`${(c.id == containerId) && classes.sidebarListItemTextSelected}`}>
                                        {c.name}
                                    </Typography>
                                </Box>
                            </Link>
                        )) }
                        <CreateNewLink Icon={AddIcon} href="/dashboard/auth/new" />
                    </Collapse>
                    <DropdownBox 
                        down={dbDropdownOpen} 
                        setDown={() => this.setState({ dbDropdownOpen: !dbDropdownOpen })} 
                        selectedTab={selectedTab === 'database'}
                        title="Database"
                    />
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
                        <CreateNewLink Icon={AddIcon} href="/dashboard/database/new" />
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