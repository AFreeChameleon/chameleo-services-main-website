import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'; 
import { Breadcrumbs } from '@material-ui/core';
import Flags from 'country-flag-icons/react/3x2';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon } from '../../Icons';

class DashboardMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes }: any = this.props;
        return (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <div className={classes.breadcrumbMain}>Dashboard</div>
                </Breadcrumbs>
                <div className={classes.notificationContainer}> 
                    <div className={classes.notificationHeader}>
                        Notifications
                    </div>
                    <div className={classes.notificationList}>
                        <div className={classes.notificationItem}>
                            <div className={classes.notificationItemHeader}>
                                Auth ran into an error while logging a user in
                            </div>
                            <div className={classes.notificationItemDate}>
                                11:04 04/12/2020
                            </div>
                            <div className={classes.flexGrow}></div>
                            <div className={classes.notificationItemFooter}>
                                <div className={classes.caution}>
                                    Caution
                                </div>
                                <div className={classes.dismiss}>
                                    Dismiss
                                </div>
                            </div>
                        </div>
                        <div className={classes.notificationItem}>
                            <div className={classes.notificationItemHeader}>
                                Someone tried logging into your account
                            </div>
                            <div className={classes.notificationItemDate}>
                                11:04 04/12/2020
                            </div>
                            <div className={classes.flexGrow}></div>
                            <div className={classes.notificationItemFooter}>
                                <div className={classes.urgent}>
                                    Urgent
                                </div>
                                <div className={classes.dismiss}>
                                    Dismiss
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className={classes.requestsChartContainer}>
                    <div className={classes.requestsChartTitle}>
                        Requests to your containers
                    </div>
                </div>
                <div className={classes.statsRow}>
                    <div className={classes.locationContainer}>
                        <div className={classes.containerTitle}>Who's using your services</div>
                        <div className={classes.locationRow}>
                            <div className={classes.locationRowFlag}>
                                <Flags.ES/>
                            </div>
                            <div className={classes.locationRowCountry}>Spain</div>
                            <div className={classes.locationRowPercent}>17%</div>
                        </div>
                        <div className={classes.locationRow}>
                            <div className={classes.locationRowFlag}>
                                <Flags.GB/>
                            </div>
                            <div className={classes.locationRowCountry}>UK</div>
                            <div className={classes.locationRowPercent}>11.5%</div>
                        </div>
                        <div className={classes.locationRow}>
                            <div className={classes.locationRowFlag}>
                                <Flags.US/>
                            </div>
                            <div className={classes.locationRowCountry}>America</div>
                            <div className={classes.locationRowPercent}>9.5%</div>
                        </div>
                        <div className={classes.flexGrow}></div>
                        <div className={classes.locationSeeMore}>
                            See more
                        </div>
                    </div>
                    <div className={classes.timeofdayContainer}>
                        <div className={classes.containerTitle}>When your services are being used</div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles: any = () => ({
    root: {
        backgroundColor: '#212121',
        padding: '15px',
        color: '#ffffff',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
            padding: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6F6F76',
            borderRadius: '5px'
        }
    },
    breadcrumbMain: {
        color: '#ffffff',
    },
    notificationContainer: {
        width: '100%',
        backgroundColor: '#2C2C2C',
        borderRadius: '10px',
        padding: '10px',
        marginTop: '10px'
    },
    notificationHeader: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft: '10px'
    },
    notificationList: {
        display: 'flex',
        marginTop: '10px',
        columnGap: '15px'
    },
    notificationItem: {
        backgroundColor: '#212121',
        width: '230px',
        height: '130px',
        borderRadius: '10px',
        padding: '10px 15px',
        display: 'flex',
        flexDirection: 'column',
        color: '#ffffff'
    },
    notificationItemHeader: {
        fontWeight: 500,
        fontSize: '14px'
    },
    notificationItemDate: {
        paddingTop: '10px',
        fontSize: '12px'
    },
    notificationItemFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px'
    },
    flexGrow: {
        flexGrow: 1
    },
    caution: {
        color: '#F9A825'
    },
    urgent: {
        color: '#ff1744'
    },
    dismiss: {
        color: '#6F6F76',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    timespanContainer: {
        marginTop: '15px',
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
    requestsChartContainer: {
        marginTop: '15px',
        backgroundColor: '#2C2C2C',
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        height: '370px'
    },
    requestsChartTitle: {
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft: '10px'
    },
    statsRow: {
        marginTop: '15px',
        display: 'flex',
        columnGap: '15px',
        width: '100%'
    },
    locationContainer: {
        backgroundColor: '#2C2C2C',
        padding: '15px 10px 15px 10px',
        borderRadius: '10px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column'
    },
    containerTitle: {
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft: '10px',
        paddingBottom: '10px'
    },
    locationRow: {
        display: 'flex',
        borderBottom: '1px solid #6F6F76',
        padding: '10px 10px',
        alignItems: 'center'
    },
    locationRowFlag: {
        width: '30px',
        height: '20px',
    },
    locationRowCountry: {
        paddingLeft: '10px',
        fontWeight: 500,
        flexGrow: 1,
        fontSize: '14px'
    },
    locationRowPercent: {
        fontSize: '14px',
        fontWeight: 500
    },
    locationSeeMore: {
        textDecoration: 'underline',
        color: '#6F6F76',
        padding: '10px 10px 0 10px',
        fontSize: '13px',
        cursor: 'pointer',
    },
    timeofdayContainer: {
        backgroundColor: '#2C2C2C',
        padding: '15px 10px 15px 10px',
        borderRadius: '10px',
        width: 'calc(100% - 280px)',
        height: '300px'
    }
})

export default withStyles(styles)(DashboardMain);