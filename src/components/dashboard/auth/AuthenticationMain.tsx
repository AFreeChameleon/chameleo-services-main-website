import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchContainers } from '../../../redux/container/actions';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import LabelIcon from '@material-ui/icons/Label';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon, SettingsIcon } from '../../Icons';
import { Checkbox, Breadcrumbs, Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import RenameContainerModal from './modals/RenameContainer';
import DeleteContainerModal from './modals/DeleteContainer';
import {
    StyledMenu,
    StyledListItemIcon
} from '../../Inputs';

type AuthenticationMainPropTypes = {
    classes: any;
    containers: any[];
    dispatchFetchContainers: () => null;
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

    render() {
        const { classes, containers, dispatchFetchContainers } = this.props;
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
                                                onClick={(e) => this.handleSettingsMenuClose()}
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

const styles: () => any = () => ({
    root: {
        backgroundColor: '#212121',
        padding: '15px',
        color: '#ffffff',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
            marginRight: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6F6F76',
            borderRadius: '5px'
        }
    },
    breadcrumb: {
        color: '#6F6F76',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    breadcrumbMain: {
        color: '#ffffff',
    },
    flexGrow: {
        flexGrow: 1
    },
    timespanContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
    },
    timespan: {
        border: '1px solid #51C85D',
        borderRadius: '20px',
        display: 'flex',
        // padding: '10px 0',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarIcon: {
        marginLeft: '10px',
        height: '20px',
    },
    arrowIcon: {
        margin: '0 10px',
        cursor: 'pointer',
        '&:hover path': {
            fill: '#ffffff',
        }
    },
    timespanContent: {
        // paddingTop: '2px'
    },
    timespanMeasure: {
        marginLeft: '20px',
        padding: '0 15px',
        height: '40px',
        border: '1px solid #6F6F76',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: '0.2s',
        display: 'grid',
        placeItems: 'center',
        '&:hover': {
            backgroundColor: '#51C85D',
            border: '1px solid #51C85D',
            color: '#ffffff'
        }
    },
    chartRow: {
        display: 'flex',
        columnGap: '15px'
    },
    registeredUsersContainer: {
        marginTop: '15px',
        backgroundColor: '#2C2C2C',
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        height: '370px'
    },
    title: {
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft: '10px'
    },
    activeUsersContainer: {
        marginTop: '15px',
        backgroundColor: '#2C2C2C',
        padding: '10px',
        borderRadius: '10px',
        height: '370px',
        width: '500px'
    },
    usersTableContainer: {
        marginTop: '15px',
        backgroundColor: '#2C2C2C',
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        // height: '370px'
    },
    usersTable: {
        marginTop: '10px'
    },
    usersTableHeaders: {
        display: 'grid',
        gridTemplateColumns: '50px 40% 20% 20% auto',
        background: '#212121',
        padding: '10px 5px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
    },
    usersTableHeader: {
        flexGrow: 1,
        fontWeight: 500
    },
    usersTableRow: {
        borderBottom: '1px solid #6F6F76',
        display: 'grid',
        gridTemplateColumns: '50px 40% 20% 20% auto',
        alignItems: 'center',
        padding: '5px'
    },
    containersContainer: {
        marginTop: '15px',
        backgroundColor: '#2C2C2C',
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        // height: '370px'
    },
    containerList: {
        padding: '5px 10px',
        color: '#ffffff',
        marginTop: '10px',
        display: 'flex',
        columnGap: '10px'
    },
    containerItem: {
        borderRadius: '10px',
        backgroundColor: '#212121',
        padding: '10px',
        borderBottom: '1px solid #2C2C2C',
        width: '250px'
    },
    containerItemHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 500
    },
    miniIcon: {
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        '& svg': {
            height: '20px',
            width: '20px',
        },
        '&:hover svg path': {
            fill: '#ffffff'
        }
    },
    containerItemStatus: {
        paddingTop: '5px',
        // fontSize: '12px',
        paddingBottom: '15px'
    },
    stopped: {
        color: '#ff1744'
    },
    running: {
        color: '#51C85D'
    },
    containerItemID: {
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    containerItemEditButton: {
        display: 'flex',
        border: '1px solid #6F6F76',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '5px',
        height: '30px',
        cursor: 'pointer',
        transition: '0.1s',
        '&:hover': {
            backgroundColor: '#6F6F7622'
        }
    },
    containerItemStartButton: {
        marginTop: '10px',
        display: 'flex',
        backgroundColor: '#51C85D88',
        border: '1px solid #51C85D88',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '5px',
        height: '30px',
        cursor: 'pointer',
        transition: '0.1s',
        '&:hover': {
            backgroundColor: '#51C85D',
            border: '1px solid #51C85D',
        }
    },
    containerItemStopButton: {
        marginTop: '10px',
        display: 'flex',
        backgroundColor: '#6F6F76',
        border: '1px solid #6F6F76',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '5px',
        height: '30px',
        cursor: 'pointer' 
    },
    containerItemStartButtonText: {
        paddingTop: '2px'
    },
    makeNewContainerButton: {
        border: '1px solid #51C85D',
        width: '250px',
        height: '150px',
        borderRadius: '10px',
        backgroundColor: '#212121',
        padding: '15px 10px 10px 10px',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: '#182b19'
        }
    },
    makeNewContainerButtonTitle: {
        fontSize: '16px',
        textAlign: 'center',
        fontWeight: 500
    },
    makeNewContainerButtonIcon: {
        width: '100%',
        height: '100px',
        display: 'grid',
        placeItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        containers: state.containers.containers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchContainers: () => dispatch(fetchContainers())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(AuthenticationMain) as React.ComponentType;