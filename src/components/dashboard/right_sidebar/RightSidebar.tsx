import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DatabaseIcon, AuthIcon, SettingsIcon } from '../../Icons';
import { FormControl, Select, MenuItem } from '@material-ui/core';

const StyledFormControl = withStyles({
    root: {
        borderBottom: '1px solid green',
        '&::before': {
        }
    }
})(Select);

class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'database'
        }
    }

    render() {
        const { classes }: any = this.props;
        const { selectedTab }: any = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.iconRow}>
                    <div 
                        className={`${classes.icon} ${selectedTab === 'database' ? classes.selectedIcon : ''}`}
                        onClick={(e) => this.setState({ selectedTab: 'database' })}
                    >
                        <DatabaseIcon/>
                    </div>
                    <div 
                        className={`${classes.icon} ${selectedTab === 'authentication' ? classes.selectedIcon : ''}`}
                        onClick={(e) => this.setState({ selectedTab: 'authentication' })}
                    >
                        <AuthIcon/>
                    </div>
                </div>
                <div className={classes.containers}>
                    <div className={classes.containersHeader}>
                        Containers
                    </div>
                    <div className={classes.containerList}>
                        <div className={classes.containerItem}>
                            <div className={classes.containerItemHeader}>
                                <div className={classes.containerItemID}>
                                    elpu6t0mzofjb9l6k8or
                                </div>
                                <div className={classes.miniIcon}>
                                    <SettingsIcon/>
                                </div>
                            </div>
                            <div className={classes.containerItemStatus}>
                                Status: <span className={classes.stopped}>Stopped</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.containerStats}>
                    <div className={classes.containerStatsHeader}>Container Statistics</div>
                    <div className={classes.containerStatsSelect}>
                        {/* <select className={classes.containerStatsSelect}>
                            <option>elpu6t0mzofjb9l6k8or</option>
                        </select> */}
                        <Select
                            value={'elpu6t0mzofjb9l6k8or'}
                            className={classes.select}
                            fullWidth
                        >
                            <MenuItem value={'elpu6t0mzofjb9l6k8or'}>elpu6t0mzofjb9l6k8or</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}

const styles: any = () => ({
    root: {
        backgroundColor: '#2C2C2C'
    },
    iconRow: {
        height: '80px',
        borderBottom: '1px solid #212121',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icon: {
        padding: '10px',
        height: '50px',
        width: '50px',
        borderRadius: '10px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover svg path': {
            fill: '#ffffff'
        }
    },
    selectedIcon: {
        backgroundColor: '#51C85D',
        '& svg path': {
            fill: '#ffffff'
        }
    },
    containers: {
        padding: '20px',
        borderBottom: '1px solid #212121'
    },
    containersHeader: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#ffffff'
    },
    containerList: {
        backgroundColor: '#212121',
        padding: '5px 10px',
        color: '#ffffff',
        borderRadius: '10px',
        marginTop: '10px'
    },
    containerItem: {
        padding: '10px',
        borderBottom: '1px solid #2C2C2C'
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
        paddingTop: '15px',
        fontSize: '12px'
    },
    stopped: {
        color: '#ff1744'
    },
    containerItemID: {
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    containerStats: {
        padding: '20px',
        borderBottom: '1px solid #212121'
    },
    containerStatsHeader: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#ffffff'
    },
    select: {
        color: '#ffffff',
        fontSize: '14px',
        marginTop: '10px',
        '&::before': {
            borderBottom: '2px solid #51C85D !important'
        },
        '&::after': {
            borderBottom: '2px solid #51C85D !important'
        },
        '& > div': {
            padding: '10px !important',
            backgroundColor: 'transparent !important'
        },
        '& > svg': {
            color: '#6F6F76'
        }
    }
});

export default withStyles(styles)(RightSidebar);