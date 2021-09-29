import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchAllUsers
} from '../../../../redux/container/auth/stats/actions';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PeopleIcon from '@material-ui/icons/PeopleOutlineOutlined';
import FireIcon from '@material-ui/icons/WhatshotOutlined';
import SendIcon from '@material-ui/icons/Send';
import { Doughnut } from 'react-chartjs-2';
import { Checkbox } from '@material-ui/core';
import UserTable from './auth/UserTable';

type AuthContainerBodyProps = {
    classes: any;
    containerId: string;
    containers: any[];
    stats: any;
    dispatchFetchAllUsers: (containerId: string) => void;
}

type AuthContainerBodyState = {
}

class AuthContainerBody extends React.Component<AuthContainerBodyProps, AuthContainerBodyState> {
    constructor(props) {
        super(props);
        const { 
            containers,
            containerId,
            dispatchFetchAllUsers, 
        } = this.props;
        console.log(containerId)
        dispatchFetchAllUsers(containerId);
    }

    getUserLimitFromTier(tier: string) {
        switch (tier) {
            case 'Free':
                return 20000;
            default:
                return 0;
        }
    }

    render() {
        const { classes, stats, containerId, containers } = this.props;
        const container = containers.find(c => c.id === containerId);
        console.log(stats, container, containers)
        return (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <NextLink href="/dashboard">
                        <Typography
                            className={classes.breadcrumb}
                        >
                            Dashboard
                        </Typography>
                    </NextLink>
                    <Typography
                        color="secondary"
                        className={classes.breadcrumbMain}
                    >
                        {containerId}
                    </Typography>
                </Breadcrumbs>
                <div className={classes.colorStatsGrid}>
                    <div className={classes.colorStatsItemRegisteredUsers}>
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.blueBg}`}>
                                <PeopleIcon fontSize="large" className={classes.blue}/>
                            </div>
                            <div className={classes.colorStatsItemText}>
                                <Typography
                                    variant="h1"
                                    className={`${classes.darkBlue} ${classes.bold}`}
                                >
                                    {stats.userCount}
                                </Typography>
                                { (container && container.tier === 'Free') && (<Typography
                                    className={`${classes.darkBlue} ${classes.bold}`}
                                >
                                    / {this.getUserLimitFromTier(container.tier).toLocaleString()}
                                </Typography>) }
                            </div>
                            <div className={`${classes.colorStatsItemTitle} ${classes.semiDarkBlue} ${classes.bold}`}>
                                Registered Users
                            </div>
                        </div>
                    </div>
                    <div className={classes.colorStatsItemEmailSent}>
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.greenBg}`}>
                                <SendIcon fontSize="large" className={classes.green} style={{paddingLeft: '5px'}}/>
                            </div>
                            <div className={classes.colorStatsItemText}>
                                <Typography
                                    variant="h1"
                                    className={`${classes.darkGreen} ${classes.bold}`}
                                >
                                    {stats.userCount}
                                </Typography>
                            </div>
                            <div className={`${classes.colorStatsItemTitle} ${classes.semiDarkGreen} ${classes.bold}`}>
                                Emails sent this month
                            </div>
                        </div>
                    </div>
                    <div className={classes.colorStatsItemActiveUsers}>
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.redBg}`}>
                                <FireIcon fontSize="large" className={classes.red}/>
                            </div>
                            <div className={classes.colorStatsItemText}>
                                <Typography
                                    variant="h1"
                                    className={`${classes.darkRed} ${classes.bold}`}
                                >
                                    {stats.userCount}
                                </Typography>
                            </div>
                            <div className={`${classes.colorStatsItemTitle} ${classes.semiDarkRed} ${classes.bold}`}>
                                Active users this month
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.gridOne}>
                    <div className={classes.requestsChartContainer}>
                        <Typography 
                            variant="h6"
                            className={classes.activeUsersTitle}
                        >
                            Requests to {container && container.name}
                        </Typography>
                    </div>
                    <div className={classes.activeUsersContainer}>
                        <Typography 
                            variant="h6"
                            className={classes.activeUsersTitle}
                        >
                            Active Users
                        </Typography>
                        <div className={classes.activeUsersChart}>
                            { stats.activeUsers && <Doughnut
                                data={{
                                    labels: ['Online', 'Away', 'Offline'],
                                    datasets: [{
                                        label: 'Active Users',
                                        data: [
                                            stats.activeUsers.online,
                                            stats.activeUsers.away,
                                            stats.activeUsers.offline
                                        ],
                                        backgroundColor: [
                                            'rgba(0, 175, 85)',
                                            'rgba(249, 168, 37)',
                                            'rgba(111, 111, 118)'
                                        ]
                                    }],
                                }}
                                options={{
                                    legend: {
                                        display: false
                                    },
                                    maintainAspectRatio: false
                                }}
                            /> }
                        </div>
                        <div className={classes.activeUsersLegend}>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendOnline}></div>
                                <div className={classes.activeUsersLegendText}>
                                    Online
                                </div>
                            </div>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendAway}></div>
                                <div className={classes.activeUsersLegendText}>
                                    Away
                                </div>
                            </div>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendOffline}></div>
                                <div className={classes.activeUsersLegendText}>
                                    Offline
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.usersTableContainer}>
                    <div className={classes.usersTableTitle}>
                        <Typography
                            variant="h6"
                        >
                            Users
                        </Typography>
                    </div>
                    { (container && container.config.model) && <UserTable schema={container.config.model}/> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stats: state.container.auth.stats,
    containers: state.containers.containers,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchAllUsers: (containerId: string) => dispatch(fetchAllUsers(containerId))
});

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme: any) => ({
        root: {
            padding: '20px',
            maxWidth: '1300px',
            margin: '0 auto'
        },
        usersTableContainer: {
            width: '100%',
            boxShadow: theme.shadows['2'],
            padding: '15px 20px',
            marginTop: '20px'
        },
        gridOne: {
            display: 'grid',
            gridTemplateColumns: 'auto 300px',
            columnGap: '20px',
            marginTop: '20px'
        },
        requestsChartContainer: {
            width: '100%',
            boxShadow: theme.shadows['2'],
            padding: '15px 20px'
        },
        activeUsersContainer: {
            boxShadow: theme.shadows['2'],
            padding: '15px 20px'
        },
        activeUsersLegend: {
            display: 'flex',
            marginTop: '20px',
            columnGap: '20px'
        },
        activeUsersLegendItem: {
            display: 'flex',
            alignItems: 'center',
            columnGap: '5px'
        },
        activeUsersLegendOnline: {
            backgroundColor: 'rgba(0, 175, 85)',
            height: '10px',
            width: '10px',
            borderRadius: '10px',
            marginBottom: '3px'
        },
        activeUsersLegendAway: {
            backgroundColor: 'rgba(249, 168, 37)',
            height: '10px',
            width: '10px',
            borderRadius: '10px',
            marginBottom: '3px'
        },
        activeUsersLegendOffline: {
            backgroundColor: 'rgba(111, 111, 118)',
            height: '10px',
            width: '10px',
            borderRadius: '10px',
            marginBottom: '3px'
        },
        activeUsersLegendText: {
            fontWeight: 600
        },
        activeUsersChart: {
            width: '250px',
            height: '250px',
            margin: '20px auto 0 auto'
        },
        breadcrumb: {
            color: theme.palette.grey.A200,
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        breadcrumbMain: {
            color: theme.palette.text.secondary,
            fontSize: '16px',
            fontWeight: 600
        },
        colorStatsGrid: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            columnGap: '20px'
        },
        colorStatsItemRegisteredUsers: {
            backgroundColor: theme.palette.background.blue + '40',
            boxShadow: theme.shadows['2'],
            height: '215px',
            display: 'grid',
            placeItems: 'center',
            width: '100%'
        },
        colorStatsItemEmailSent: {
            backgroundColor: theme.palette.background.green + '40',
            boxShadow: theme.shadows['2'],
            height: '215px',
            display: 'grid',
            placeItems: 'center',
            width: '100%'
        },
        colorStatsItemActiveUsers: {
            backgroundColor: theme.palette.background.red + '40',
            boxShadow: theme.shadows['2'],
            height: '215px',
            display: 'grid',
            placeItems: 'center',
            width: '100%'
        },
        blueBg: {
            backgroundColor: theme.palette.background.blue + '4D',
        },
        redBg: {
            backgroundColor: theme.palette.background.red + '4D',
        },
        greenBg: {
            backgroundColor: theme.palette.background.green + '4D',
        },
        colorStatsItemLogo: {
            height: '60px',
            width: '60px',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            margin: 'auto',
        },
        colorStatsItemLogoLarge: {
            height: '60px',
            width: '60px',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            margin: 'auto',
            '& > svg': {
                fontSize: '45px'
            }
        },
        colorStatsItemText: {
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            columnGap: '5px',
            paddingTop: '15px'
        },
        colorStatsItemTitle: {
            paddingTop: '10px'
        },
        blue: {
            color: theme.palette.background.blue
        },
        green: {
            color: theme.palette.primary.main
        },
        red: {
            color: theme.palette.background.red
        },
        semiDarkBlue: {
            color: '#224588'
        },
        semiDarkGreen: {
            color: '#008440'
        },
        semiDarkRed: {
            color: '#AB2034'
        },
        darkBlue: {
            color: '#233760'
        },
        darkGreen: {
            color: '#007539'
        },
        darkRed: {
            color: '#A61D30'
        },
        bold: {
            fontWeight: 700
        }
    }))
)(AuthContainerBody);