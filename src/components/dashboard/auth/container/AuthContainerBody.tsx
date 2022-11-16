import React from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchAllUsers
} from '../../../../redux/container/auth/stats/actions';
import { fetchContainers } from '../../../../redux/container/actions';
import {
    Breadcrumbs,
    Typography,
    Button,
    MenuItem,
    Select,
    CircularProgress,
    Box
} from '@mui/material';
import { styled } from '@mui/styles';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PeopleIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FireIcon from '@mui/icons-material/WhatshotOutlined';
import SendIcon from '@mui/icons-material/Send';

import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import UserTable from './auth/UserTable';
import UserStatisticsTable from './auth/UserStatisticsTable';

import {
    StyledSelect,
    NumberInputNoTicks,
    GreenButton,
} from '../../../Inputs';

import classes from './AuthContainerBody.module.scss';

Chart.register(ArcElement);

const SmallSelect = styled(Select)(({
    root: {
        fontSize: '14px',
        paddingLeft: '5px',
        paddingRight: '5px',
    }
}));

const ShadowBox = styled(Box)(({theme}) => ({
    boxShadow: theme.shadows['2']
}))

type AuthContainerBodyProps = {
    containerId: string;
    apiUrl: string;
    containers: any[];
    stats: any;
    dispatchFetchAllUsers: (containerId: string) => void;
    dispatchFetchContainers: () => void;
}

type AuthContainerBodyState = {
    statisticsMode: any;
    statusLoading: boolean;
}

class AuthContainerBody extends React.Component<AuthContainerBodyProps, AuthContainerBodyState> {
    private statsModeRef: React.RefObject<any>
    constructor(props) {
        super(props);
        const { 
            containers,
            containerId,
            dispatchFetchAllUsers, 
        } = this.props;
        
        this.startContainer = this.startContainer.bind(this);
        this.stopContainer = this.stopContainer.bind(this);

        console.log(containerId)
        dispatchFetchAllUsers(containerId);
        this.statsModeRef = React.createRef();

        this.state = {
            statisticsMode: 'browser',
            statusLoading: false
        }

    }

    getUserLimitFromTier(tier: string) {
        switch (tier) {
            case 'Free':
                return 20000;
            default:
                return 0;
        }
    }

    async startContainer() {
        const { 
            containerId, 
            containers, 
            apiUrl, 
            dispatchFetchContainers 
        } = this.props;
        this.setState({statusLoading: true})

        const selectedContainer = containers.find((c) => c.id === containerId);

        if (!selectedContainer) {
            return;
        }

        axios.post(`${apiUrl}/api/containers/${selectedContainer.id}/start`)
        .then(async (res) => {
            await dispatchFetchContainers();
        })
        .catch(async (err) => {
            console.error(err);
            await dispatchFetchContainers();
        }).finally(() => this.setState({statusLoading: false}));
    }

    async stopContainer() {
        const { 
            containerId, 
            containers, 
            apiUrl, 
            dispatchFetchContainers 
        } = this.props;
        this.setState({statusLoading: true})

        const selectedContainer = containers.find((c) => c.id === containerId);

        if (!selectedContainer) {
            return;
        }

        axios.post(`${apiUrl}/api/containers/${selectedContainer.id}/stop`)
        .then(async (res) => {
            await dispatchFetchContainers();
        })
        .catch(async (err) => {
            console.error(err);
            await dispatchFetchContainers();
        }).finally(() => this.setState({statusLoading: false}));
        
    }

    render() {
        const { stats, containerId, containers } = this.props;
        const { statisticsMode, statusLoading } = this.state;
        const container = containers.find(c => c.id === containerId);
        console.log(stats, container, containers)
        return container ? (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <NextLink href="/dashboard" className={classes.link}>
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
                <Box 
                    component="div" 
                    sx={{ borderTop: '1px solid grey.50' }}
                    className={classes.statusContainer} 
                >
                    <div className={classes.status}>
                        <Typography
                            variant="body1"
                            className={classes.statusText}
                        >
                            Status:&nbsp;
                        </Typography>
                        { container.status === 'Stopped' ? (
                            <Typography
                                color="error"
                                variant="body1"
                                className={classes.statusText}
                            >
                                Stopped
                            </Typography>
                        ) : (
                            <Typography
                                color="primary"
                                variant="body1"
                                className={classes.statusText}
                            >
                                Running
                            </Typography>
                        ) }
                    </div>
                    { container.status === 'Stopped' ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.startContainer}
                            className={classes.changeStatusButton}
                            disabled={statusLoading}
                        >
                            { statusLoading ? 'Starting' : 'Start' }
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={this.stopContainer}
                            className={`${classes.changeStatusButton} ${classes.errorButton}`}
                            disabled={statusLoading}
                        >
                            { statusLoading ? 'Stopping' : 'Stop' }
                        </Button>
                    ) }
                </Box>
                <div className={classes.colorStatsGrid}>
                    <ShadowBox 
                        className={classes.colorStatsItemRegisteredUsers}
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.blue + '40'
                        }}
                    >
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.blueBg}`}>
                                <PeopleIcon fontSize="large" className={classes.blue} sx={{ color: 'background.blue' }}/>
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
                    </ShadowBox>
                    <ShadowBox 
                        className={classes.colorStatsItemEmailSent}
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.green + '40'
                        }}
                    >
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.greenBg}`}>
                                <SendIcon fontSize="large" style={{paddingLeft: '5px'}} sx={{ color: 'background.green' }}/>
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
                    </ShadowBox>
                    <ShadowBox 
                        className={classes.colorStatsItemActiveUsers}
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.red + '40'
                        }}
                    >
                        <div>
                            <div className={`${classes.colorStatsItemLogoLarge} ${classes.redBg}`}>
                                <FireIcon fontSize="large" sx={{ color: 'background.red' }}/>
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
                    </ShadowBox>
                </div>
                <div className={classes.gridOne}>
                    <ShadowBox className={classes.requestsChartContainer}>
                        <Typography 
                            variant="h6"
                            className={classes.activeUsersTitle}
                        >
                            Requests to {container && container.name}
                        </Typography>
                        <div className={classes.requestsChart}>

                        </div>
                        <div className={classes.logsLinkContainer}>
                            <Typography
                                className={classes.logsLink}
                                sx={{ color: 'primary.main', width: 'fit-content' }}
                            >
                                <NextLink href={`/dashboard/auth/container/${container.id}/logs`}>
                                View logs
                                </NextLink>
                            </Typography>
                        </div>
                    </ShadowBox>
                    <ShadowBox className={classes.activeUsersContainer}>
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
                                    maintainAspectRatio: false
                                }}
                            /> }
                        </div>
                        <div className={classes.activeUsersLegend}>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendOnline}></div>
                                <Typography className={classes.activeUsersLegendText} variant="caption">
                                    Online
                                </Typography>
                            </div>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendAway}></div>
                                <Typography className={classes.activeUsersLegendText} variant="caption">
                                    Away
                                </Typography>
                            </div>
                            <div className={classes.activeUsersLegendItem}>
                                <div className={classes.activeUsersLegendOffline}></div>
                                <Typography className={classes.activeUsersLegendText} variant="caption">
                                    Offline
                                </Typography>
                            </div>
                        </div>
                    </ShadowBox>
                </div>
                <ShadowBox className={classes.usersTableContainer}>
                    <div className={classes.usersTableTitle}>
                        <Typography
                            gutterBottom
                            variant="h6"
                        >
                            Users
                        </Typography>
                    </div>
                    { (container && container.config.model) && <UserTable schema={container.config.model} containerId={containerId} /> }
                </ShadowBox>
                <div className={classes.gridTwo}>
                    <ShadowBox className={classes.userStatisticsContainer}>
                        <div className={classes.userStatisticsTitle}>
                            <Typography
                                variant="h6"
                            >
                                User Statistics
                            </Typography>
                            <SmallSelect
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    anchorEl: null
                                }}
                                input={<StyledSelect/>}
                                value={statisticsMode}
                                onChange={(e) => this.setState({
                                    statisticsMode: e.target.value
                                })}
                            >
                                <MenuItem value="location">Location</MenuItem>
                                <MenuItem value="devices">Devices</MenuItem>
                                <MenuItem value="browser">Browser</MenuItem>
                            </SmallSelect>
                        </div>
                        { (container) && <UserStatisticsTable containerId={containerId} type={statisticsMode} /> }
                    </ShadowBox>
                    <ShadowBox className={classes.requestsChartContainer}>
                        <Typography
                            gutterBottom
                            variant="h6"
                        >
                            CPU Usage
                        </Typography>

                    </ShadowBox>
                </div>
                <div className={classes.gridOne}>
                    <ShadowBox className={classes.activeUsersContainer}>
                        <Typography
                            gutterBottom
                        >
                            Recent invoices
                        </Typography>
                    </ShadowBox>
                </div>
            </div>
        ) : null;
    }
}

const mapStateToProps = (state) => ({
    stats: state.container.auth.stats,
    containers: state.containers.containers,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchAllUsers: (containerId: string) => dispatch(fetchAllUsers(containerId)),
    dispatchFetchContainers: () => dispatch(fetchContainers())
    // dispatchFetchInvoices: (containerId: string) => dispatch()
});

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
)(AuthContainerBody);