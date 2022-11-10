import React from 'react';
import NextLink from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchContainers } from '../../../redux/container/actions';
import { setContainer } from '../../../redux/container/auth/edit/actions';

import {
    Checkbox, 
    Breadcrumbs, 
    Menu, 
    MenuItem, 
    Typography, 
    ListItemIcon
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import LabelIcon from '@mui/icons-material/Label';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon, SettingsIcon } from '../../Icons';

import RenameContainerModal from './modals/RenameContainer';
import DeleteContainerModal from './modals/DeleteContainer';
import {
    StyledMenu,
    StyledListItemIcon
} from '../../Inputs';

import classes from './AuthenticationMain.module.scss';

type AuthenticationMainPropTypes = {
    containers: any[];
    router: NextRouter;
    dispatchFetchContainers: () => null;
    dispatchSetContainer: (container: any) => null;
}

type AuthenticationMainStateTypes = {
    settingsAnchorEl: any;
    selectedContainer: any;
    renameModalOpen: boolean;
    deleteModalOpen: boolean;
}

class AuthenticationMain extends React.Component<AuthenticationMainPropTypes, AuthenticationMainStateTypes> {
    constructor(props) {
        super(props);

        this.state = {
            settingsAnchorEl: null,
            selectedContainer: null,
            renameModalOpen: false,
            deleteModalOpen: false
        }

        this.handleSettingsMenuOpen = this.handleSettingsMenuOpen.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleRenameModalClose = this.handleRenameModalClose.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
    }

    componentDidMount() {
        const { dispatchFetchContainers } = this.props;
        dispatchFetchContainers();
    }

    handleSettingsMenuOpen(e) {
        this.setState({ settingsAnchorEl: e.currentTarget });
    }

    handleSettingsMenuClose(newState?: { [key: string]: any }) {
        this.setState({ settingsAnchorEl: null, ...newState });
    }

    handleRenameModalClose(e) {
        this.setState({ renameModalOpen: false });
    }

    handleDeleteModalClose(e) {
        this.setState({ deleteModalOpen: false });
    }

    handleEditContainer(container: any) {
        const { router, dispatchSetContainer } = this.props;
        dispatchSetContainer({
            name: container.name,
            tier: container.tier,
            config: container.config
        });
        router.push('/dashboard/auth/edit');
    }

    render() {
        const { containers, dispatchFetchContainers } = this.props;
        const { settingsAnchorEl, renameModalOpen, deleteModalOpen, selectedContainer } = this.state;
        console.log(containers);
        
        return (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <NextLink href="/dashboard">
                        <div className={classes.breadcrumb}>Dashboard</div>
                    </NextLink>
                    <div className={classes.breadcrumbMain}>Auth</div>
                </Breadcrumbs>
                { renameModalOpen && <RenameContainerModal 
                    open={renameModalOpen} 
                    onClose={this.handleRenameModalClose}
                    container={selectedContainer}
                    fetchContainers={dispatchFetchContainers}
                /> }
                { deleteModalOpen && <DeleteContainerModal 
                    open={deleteModalOpen} 
                    onClose={this.handleDeleteModalClose}
                    container={selectedContainer}
                    fetchContainers={dispatchFetchContainers}
                /> }
                <div className={classes.timespanContainer}>
                    <div className={classes.timespan}>
                        <CalendarIcon className={classes.calendarIcon}/>
                        <LeftArrowIcon className={classes.arrowIcon}/>
                        <div className={classes.timespanContent}>
                            01 Nov 2019 - 01 Dec 2020
                        </div>
                        <RightArrowIcon className={classes.arrowIcon}/>
                    </div>
                    <div className={classes.timespanMeasure}>
                        Today
                    </div>
                    <div className={classes.timespanMeasure}>
                        Yesterday
                    </div>
                    <div className={classes.timespanMeasure}>
                        Week
                    </div>
                    <div className={classes.timespanMeasure}>
                        Month
                    </div>
                </div>
                <div className={classes.chartRow}>
                    <div className={classes.registeredUsersContainer}>
                        <div className={classes.title}>Registered</div>
                    </div>
                    <div className={classes.activeUsersContainer}>
                        <div className={classes.title}>Active users</div>
                    </div>
                </div>
                <div className={classes.containersContainer}>
                    <div className={classes.title}>Containers</div>
                    <div className={classes.containerList}>
                        { containers.map((container, i) => (
                            <div className={classes.containerItem} key={i}>
                                <div className={classes.containerItemHeader}>
                                    <div className={classes.containerItemID}>
                                        {container.name}
                                    </div>
                                    <div className={classes.miniIcon}>
                                        <SettingsIcon onClick={this.handleSettingsMenuOpen}/>
                                        <StyledMenu 
                                            anchorEl={settingsAnchorEl}
                                            open={Boolean(settingsAnchorEl)}
                                            onClose={(e) => this.handleSettingsMenuClose()}
                                        >
                                            <MenuItem 
                                                onClick={(e) => this.handleEditContainer(container)}
                                            >
                                                <StyledListItemIcon>
                                                    <EditIcon fontSize="small" htmlColor="#6F6F76" />
                                                </StyledListItemIcon>
                                                <Typography
                                                >
                                                    Edit
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem 
                                                onClick={(e) => this.handleSettingsMenuClose({ 
                                                    renameModalOpen: true, 
                                                    selectedContainer: container 
                                                })}
                                            >
                                                <StyledListItemIcon>
                                                    <LabelIcon fontSize="small" htmlColor="#6F6F76" />
                                                </StyledListItemIcon>
                                                <Typography
                                                >
                                                    Rename
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem 
                                                onClick={(e) => this.handleSettingsMenuClose()}
                                            >
                                                <StyledListItemIcon>
                                                    <FileCopyIcon fontSize="small" htmlColor="#6F6F76" />
                                                </StyledListItemIcon>
                                                <Typography
                                                >
                                                    Duplicate
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem 
                                                onClick={(e) => this.handleSettingsMenuClose({ 
                                                    deleteModalOpen: true, 
                                                    selectedContainer: container 
                                                })}
                                            >
                                                <StyledListItemIcon>
                                                    <DeleteForeverIcon fontSize="small" htmlColor="#ff1744" />
                                                </StyledListItemIcon>
                                                <Typography
                                                    style={{color: '#ff1744'}}
                                                >
                                                    Delete
                                                </Typography>
                                            </MenuItem>
                                        </StyledMenu>
                                    </div>
                                </div>
                                <div className={classes.containerItemStatus}>
                                    Status: { container.status === 'Stopped' ? 
                                        <span className={classes.stopped}>Stopped</span> :
                                        <span className={classes.running}>Running</span> 
                                    }
                                </div>
                                <div className={classes.containerItemEditButton}>
                                    <EditIcon fontSize="small"/> 
                                    <div className={classes.containerItemStartButtonText}>
                                        EDIT
                                    </div>
                                </div>
                                { container.status === 'Stopped' ? 
                                    <div className={classes.containerItemStartButton}>
                                        <PlayIcon fontSize="small"/> 
                                        <div className={classes.containerItemStartButtonText}>
                                            START
                                        </div>
                                    </div> :
                                    <div className={classes.containerItemStopButton}>
                                        <StopIcon fontSize="small"/> 
                                        <div className={classes.containerItemStartButtonText}>
                                            STOP
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                        <NextLink href="/dashboard/auth/new">
                            <div className={classes.makeNewContainerButton}>
                                <div className={classes.makeNewContainerButtonTitle}>
                                    NEW CONTAINER
                                </div>
                                <div className={classes.makeNewContainerButtonIcon}>
                                    <AddIcon fontSize="large" />
                                </div>
                            </div>
                        </NextLink>
                        
                    </div>
                </div>
                <div className={classes.usersTableContainer}>
                    <div className={classes.title}>Users</div>
                    <div className={classes.usersTable}>
                        <div className={classes.usersTableHeaders}>
                            <div className={classes.usersTableHeader}></div>
                            <div className={classes.usersTableHeader}>Email</div>
                            <div className={classes.usersTableHeader}>Username</div>
                            <div className={classes.usersTableHeader}>Name</div>
                            <div className={classes.usersTableHeader}>Verified</div>
                        </div>
                        <div className={classes.usersTableBody}>
                            <div className={classes.usersTableRow}>
                                <div className={classes.usersTableColumn}>
                                    <Checkbox/>
                                </div>
                                <div className={classes.usersTableColumn}>ben.evans@chamel.io</div>
                                <div className={classes.usersTableColumn}>Benamon</div>
                                <div className={classes.usersTableColumn}>Ben Evans</div>
                                <div className={classes.usersTableColumn}>Not verified</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        containers: state.containers.containers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchContainers: () => dispatch(fetchContainers()),
        dispatchSetContainer: (container: any) => dispatch(setContainer(container))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(withRouter(AuthenticationMain)) as React.ComponentType;