import React from 'react';
import Link from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon, SettingsIcon } from '../../Icons';
import { Checkbox } from '@material-ui/core';

type AuthenticationMainPropTypes = {
    classes: any;
    containers: any[];
}

class AuthenticationMain extends React.Component<AuthenticationMainPropTypes> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, containers } = this.props;
        console.log(containers);
        
        return (
            <div className={classes.root}>
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
                        {containers.length > 0 ? containers.map((container) => (
                            <div className={classes.containerItem}>
                                <div className={classes.containerItemHeader}>
                                    <div className={classes.containerItemID}>
                                        {container.name}
                                    </div>
                                    <div className={classes.miniIcon}>
                                        <SettingsIcon/>
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
                        )) : (
                            <Link href="/dashboard/auth/new">
                                <div className={classes.makeNewContainerButton}>
                                    <div className={classes.makeNewContainerButtonTitle}>
                                        NEW CONTAINER
                                    </div>
                                    <div className={classes.makeNewContainerButtonIcon}>
                                        <AddIcon fontSize="large" />
                                    </div>
                                </div>
                            </Link>
                        )}
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
        overflowY: 'auto'
    },
    flexGrow: {
        flexGrow: 1
    },
    timespanContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
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
        marginTop: '10px'
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
        color: '#C85151'
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
    },
    containerItemStartButton: {
        marginTop: '10px',
        display: 'flex',
        backgroundColor: '#51C85D',
        border: '1px solid #51C85D',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '5px',
        height: '30px',
        cursor: 'pointer' 
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

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(AuthenticationMain) as React.ComponentType;