import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import ping from 'web-pingjs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setContainerLocation, setContainerName } from '../../../../redux/container/auth/config/actions';
import { 
    Typography, 
    Button, 
    Modal, 
    TextField, 
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import WorldMap from '../../../../../public/img/worldmap.png';

import classes from './CreateContainerLocation.module.scss';

type CreateContainerLocationProps = {
    container: any;
    router: NextRouter;
    changeSelectedPage: (val: number) => void;
    dispatchSetContainerName: (val: string) => void;
    dispatchSetContainerLocation: (val: string) => void;
}

type CreateContainerLocationState = {
    containerNameOpen: boolean;
    latencyTestOpen: boolean;
    errorText: string;
    averageLatency: {
        london?: number;
    }
}

// ! TODO revisit this when server comes up for latency test
class CreateContainerLocation extends React.Component<CreateContainerLocationProps, CreateContainerLocationState> {
    constructor(props) {
        super(props);
        this.runLatencyTest = this.runLatencyTest.bind(this);
        this.getBestLatencyScore = this.getBestLatencyScore.bind(this);
        this.submitCreateContainer = this.submitCreateContainer.bind(this);
        this.state = {
            containerNameOpen: false,
            latencyTestOpen: false,
            averageLatency: {},
            errorText: ''
        }
    }

    serverList = {
        london: [
            'http://localhost:3000/'
        ]
    }

    async runLatencyTest() {
        const { averageLatency } = this.state;
        this.setState({
            averageLatency: {},
            latencyTestOpen: true
        });
        let londonLatencies = [];
        let delta = 0;
        for (const server of this.serverList.london) {
            for (let i = 0; i < 5; i++) {
                delta = await ping(server);
                londonLatencies.push(delta)
            }
            this.setState({
                averageLatency: {
                    ...averageLatency,
                    london: londonLatencies.reduce((a, b) => a + b, 0) / londonLatencies.length
                }
            });
        }
    }

    getBestLatencyScore() {
        const { averageLatency } = this.state;
        let bestScore = Math.min(...Object.values(averageLatency))
        const key = Object.keys(averageLatency).filter(l => averageLatency[l] === bestScore)[0];
        const uppercaseKey = key[0].toUpperCase() + key.substring(1);
        return `${uppercaseKey} ${bestScore}ms`;
    }

    submitCreateContainer(e) {
        const { container, router } = this.props;
        axios.post('/api/container/auth/new', {
            name: container.name,
            tier: container.tier,
            config: container.data,
            location: container.location
        }, { withCredentials: true })
        .then((res) => {
            if (res.status === 200) {
                router.push(`/dashboard/auth/container/${res.data.uuid}`);
            } else {
                this.setState({ errorText: res.data.errors[0] });
            }
        })
        .catch((err) => {
            if (err.response) {
                this.setState({ errorText: err.response.data.errors[0] });
            } else {
                this.setState({ errorText: 'Could not create your container at this time. Please try again soon' });
            }
        })
    }

    render() {
        const { changeSelectedPage, container, dispatchSetContainerLocation, dispatchSetContainerName } = this.props;
        const { containerNameOpen, latencyTestOpen, averageLatency, errorText } = this.state;
        return (
            <div className={classes.root}>
                <Box component="div" className={classes.backButtonContainer}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBackIcon/>}
                        onClick={(e) => changeSelectedPage(1)}
                    >
                        GO BACK TO PRICING
                    </Button>
                </Box>
                <Snackbar open={Boolean(errorText)} autoHideDuration={6000} onClose={() => this.setState({ errorText: '' })}>
                    <Alert onClose={() => this.setState({ errorText: '' })} severity="error" variant="filled">
                        {errorText}
                    </Alert>
                </Snackbar>
                <Box component="div" className={classes.container} sx={{ boxShadow: 2 }}>
                    <Typography
                        variant="h5"
                    >
                        Pick a server location
                    </Typography>
                    <div className={classes.map}>
                        <div className={classes.mapImage}>
                            <div className={classes.pins}>
                                <div
                                    className={`${classes.pin} ${classes.ukPin}`} 
                                    onClick={(e) => {
                                        this.setState({ 
                                            containerNameOpen: true,
                                        });
                                        dispatchSetContainerLocation('london');
                                    }}
                                >
                                    <Box className={classes.markerText} sx={{ backgroundColor: 'background.paper', boxShadow: 2 }}>London</Box>
                                    <Box component="div" className={classes.marker} sx={{ backgroundColor: 'secondary.main', boxShadow: 4 }}></Box>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.latencyTest}>
                        <Typography
                            color="primary"
                            component="a"
                            className={classes.latencyTestText}
                            onClick={this.runLatencyTest}
                            href="#"
                            sx={{ color: 'primary.main' }}
                        >
                            Run latency test
                        </Typography>
                    </div>
                </Box>
                <Modal
                    open={containerNameOpen}
                    onClose={(e) => this.setState({ containerNameOpen: false })}
                    className={classes.center}
                >
                    <Box component="div" className={classes.nameModal} sx={{ backgroundColor: 'background.paper' }}>
                        <Typography
                            variant="h5"
                            className={classes.modalTitle}
                        >
                            Choose a name for your container
                        </Typography>
                        <div className={classes.modalTextFieldContainer}>
                            <TextField
                                fullWidth
                                color="primary"
                                variant="standard"
                                placeholder="Container name"
                                value={container.name}
                                onChange={(e) => dispatchSetContainerName(e.target.value)}
                            />
                        </div>
                        <div className={classes.modalCreateContainerButton}>
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                startIcon={<AddIcon/>}
                                onClick={this.submitCreateContainer}
                            >
                                Create Container
                            </Button>
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={latencyTestOpen}
                    onClose={(e) => this.setState({ latencyTestOpen: false })}
                    className={classes.center}
                >
                    <Box component="div" className={classes.latencyModal} sx={{ backgroundColor: 'background.paper' }}>
                        <Typography
                            variant="h5"
                            className={classes.modalTitle}
                            gutterBottom
                        >
                            Latency test
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Location</TableCell>
                                        <TableCell align="right">Latency (ms)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>London</TableCell>
                                        <TableCell align="right">{averageLatency.london || 'Loading...'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                            className={classes.latencySummary}
                        >
                            Your best location is:
                        </Typography>
                        { (Object.values(averageLatency).filter(l => l !== null).length > 0) && (<>
                            <Typography
                                variant="subtitle1"
                                color="primary"
                            >
                                { this.getBestLatencyScore() }
                            </Typography>
                        
                            <div className={classes.selectButtons}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.setState({ 
                                            latencyTestOpen: false,
                                            containerNameOpen: true,
                                        });
                                        dispatchSetContainerLocation(Object.keys(averageLatency).filter(l => averageLatency[l] === Math.min(...Object.values(averageLatency)))[0])
                                    }}
                                >
                                    SELECT {Object.keys(averageLatency).filter(l => averageLatency[l] === Math.min(...Object.values(averageLatency)))[0]}
                                </Button>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => {
                                        this.runLatencyTest();
                                    }}
                                >
                                    RETRY
                                </Button>
                            </div>
                        </>) }
                    </Box>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    container: state.container.auth.config
});

const mapDispatchToProps = (dispatch) => ({
    dispatchSetContainerLocation: (value: string) => dispatch(setContainerLocation(value)),
    dispatchSetContainerName: (value: string) => dispatch(setContainerName(value))
})

export default compose<any>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(CreateContainerLocation);