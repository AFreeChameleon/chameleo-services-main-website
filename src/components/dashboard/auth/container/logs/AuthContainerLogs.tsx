import React from 'react';
import NextLink from 'next/link';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchAllUsers
} from '../../../../../redux/container/auth/stats/actions';
import { fetchContainers } from '../../../../../redux/container/actions';

import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';
import MetadataWebsocket from '../../../../../lib/container/auth/ws_client';

type AuthContainerLogsProps = {
    classes: any;
    logs: { message: string; level: string; }[];
    containerId: string;
    apiUrl: string;
    containers: any[];
    stats: any;
    dispatchFetchAllUsers: (containerId: string) => void;
    dispatchFetchContainers: () => void;
}

type AuthContainerLogsState = {

}

class AuthContainerLogs extends React.Component<AuthContainerLogsProps, AuthContainerLogsState> {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            classes, 
            containerId, 
            logs
        } = this.props;

        console.log(logs);
        
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
                    <NextLink href={`/dashboard/auth/container/${containerId}`}>
                        <Typography
                            className={classes.breadcrumb}
                        >
                            {containerId}
                        </Typography>
                    </NextLink>
                    <Typography
                        color="secondary"
                        className={classes.breadcrumbMain}
                    >
                        Logs
                    </Typography>
                </Breadcrumbs>
                <div className={classes.container}>
                    <div className={classes.logsContainer}>
                        <div className={classes.logsOutput}>
                            {logs.map((log) => (
                                <div className={classes.log}>
                                    [{log.level.toUpperCase()}] {log.message}
                                </div>
                            ))}
                        </div>
                    </div>
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
    dispatchFetchAllUsers: (containerId: string) => dispatch(fetchAllUsers(containerId)),
    dispatchFetchContainers: () => dispatch(fetchContainers())
    // dispatchFetchInvoices: (containerId: string) => dispatch()
});

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme: any) => ({
        root: {
            padding: '20px',
            maxWidth: '1300px',
            margin: '0 auto'
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
        container: {
            width: '100%',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            columnGap: '15px',
            borderTop: '1px solid ' + theme.palette.grey['50'],
            paddingTop: '20px'
        },
        logsContainer: {
            width: '100%',
            boxShadow: theme.shadows['2'],
            padding: '15px 20px',
            display: 'flex',
            flexDirection: 'column',
        },
        log: {
            marginBottom: '10px',
            fontFamily: '"Lucida Console", "Courier New", monospace',
            fontSize: '12px'
        },
        logsOutput: {
            width: '100%',
            height: '500px',
            backgroundColor: theme.palette.grey['50'],
            border: '1px solid ' + theme.palette.grey['400'],
            padding: '10px 15px',
            overflowY: 'auto'
        },
    }))
)(AuthContainerLogs);