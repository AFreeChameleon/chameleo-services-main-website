import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import ping from 'web-pingjs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setContainerLocation, setContainerName } from '../../../../redux/container/auth/config/actions';
import { Typography, withStyles, Button, Modal, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WorldMap from '../../../../../public/img/worldmap.png'
import AddIcon from '@material-ui/icons/Add';

type CreateContainerLocationProps = {
    classes: any;
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
        const { classes, changeSelectedPage, container, dispatchSetContainerLocation, dispatchSetContainerName } = this.props;
        const { containerNameOpen, latencyTestOpen, averageLatency, errorText } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.backButtonContainer}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBackIcon/>}
                        onClick={(e) => changeSelectedPage(1)}
                    >
                        GO BACK TO PRICING
                    </Button>
                </div>
                <Snackbar open={Boolean(errorText)} autoHideDuration={6000} onClose={() => this.setState({ errorText: '' })}>
                    <Alert onClose={() => this.setState({ errorText: '' })} severity="error" variant="filled">
                        {errorText}
                    </Alert>
                </Snackbar>
                <div className={classes.container}>
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
                                    <div className={classes.markerText}>London</div>
                                    <div className={classes.marker}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.latencyTest}>
                        <Typography
                            color="primary"
                        >
                            <a className={classes.latencyTestText} href="#" onClick={this.runLatencyTest}>Run latency test</a>
                        </Typography>
                    </div>
                </div>
                <Modal
                    open={containerNameOpen}
                    onClose={(e) => this.setState({ containerNameOpen: false })}
                    className={classes.center}
                >
                    <div className={classes.nameModal}>
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
                    </div>
                </Modal>
                <Modal
                    open={latencyTestOpen}
                    onClose={(e) => this.setState({ latencyTestOpen: false })}
                    className={classes.center}
                >
                    <div className={classes.latencyModal}>
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
                    </div>
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
    withStyles((theme) => ({
        root: {
            // marginTop: '40px'
            width: '960px'
        },
        container: {
            boxShadow: theme.shadows['2'],
            width: '100%',
            padding: '20px',
            marginTop: '20px'
        },
        map: {
            paddingTop: '20px',
        },
        mapImage: {
            width: '100%',
            height: '400px',
            backgroundImage: `url('/img/worldmap.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },
        pins: {
            position: 'absolute'
        },
        pin: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '10px'
        },
        ukPin: {
            top: '30px',
            left: '350px'
        },
        marker: {
            width: '10px',
            height: '10px',
            backgroundColor: theme.palette.secondary.main,
            boxShadow: theme.shadows['4'],
            borderRadius: '50%',
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
                width: '15px',
                height: '15px',
                marginTop: '-2px'
            }
        },
        markerText: {
            padding: '5px 10px',
            boxShadow: theme.shadows['2'],
            backgroundColor: theme.palette.background.paper,
            cursor: 'pointer',
            '&:hover + div': {
                width: '15px',
                height: '15px',
                marginTop: '-2px'
            }
        },
        latencyTest: {
            textAlign: 'center'
        },
        latencyTestText: {
            color: theme.palette.primary.main
        },
        backButtonContainer: {
            // paddingTop: '40px'
        },
        center: {
            display: 'grid',
            placeItems: 'center'
        },
        nameModal: {
            width: '400px',
            backgroundColor: theme.palette.background.paper,
            padding: '20px'
        },
        latencyModal: {
            width: '500px',
            backgroundColor: theme.palette.background.paper,
            padding: '20px'
        },
        modalTextFieldContainer: {
            paddingTop: '30px'
        },
        modalCreateContainerButton: {
            paddingTop: '20px'
        },
        latencyTestRow: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '60px',
            alignItems: 'center'
        },
        latencyTestHeaders: {
            fontWeight: 600
        },
        latencySummary: {
            paddingTop: '20px'
        },
        selectButtons: {
            paddingTop: '20px',
            display: 'flex',
            columnGap: '10px'
        }
    }))
)(CreateContainerLocation);