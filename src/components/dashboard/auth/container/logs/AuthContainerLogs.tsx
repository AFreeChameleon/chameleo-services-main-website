import React from 'react';
import NextLink from 'next/link';

import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    fetchAllUsers
} from '../../../../../redux/container/auth/stats/actions';
import { fetchContainers } from '../../../../../redux/container/actions';

import {
    Breadcrumbs,
    Typography,
    TextField,
    Box
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import MetadataWebsocket from '../../../../../lib/container/auth/ws_client';

import classes from './AuthContainerLogs.module.scss';

type AuthContainerLogsProps = {
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
                            sx={{ color: 'grey.A200' }}
                        >
                            {containerId}
                        </Typography>
                    </NextLink>
                    <Typography
                        color="secondary"
                        className={classes.breadcrumbMain}
                        sx={{ color: 'text.secondary' }}
                    >
                        Logs
                    </Typography>
                </Breadcrumbs>
                <Box 
                    component="div"
                    className={classes.container}
                    sx={{ borderTop: '1px solid grey.50' }}
                >
                    <Box 
                        component="div"
                        className={classes.logsContainer}
                        sx={{ boxShadow: 2 }}
                    >
                        <Box 
                            component="div"
                            className={classes.logsOutput} 
                            sx={{ 
                                border: '1px solid grey.400', 
                                backgroundColor: 'grey.50' 
                            }}
                        >
                            {logs.map((log) => (
                                <div className={classes.log}>
                                    [{log.level.toUpperCase()}] {log.message}
                                </div>
                            ))}
                        </Box>
                    </Box>
                </Box>
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
    connect(mapStateToProps, mapDispatchToProps)
)(AuthContainerLogs);