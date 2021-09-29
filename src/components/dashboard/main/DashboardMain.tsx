import React from 'react';
import Image from 'next/image';
import { withStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'; 
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Flags from 'country-flag-icons/react/3x2';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon } from '../../Icons';
import CloudGraphic from '../../../img/cloud.svg';

class DashboardMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes }: any = this.props;
        return (
            <div className={classes.root}>
                <Typography 
                    gutterBottom
                    color="secondary"
                    className={classes.breadcrumbMain}
                >
                    Dashboard
                </Typography>
                <Grid container className={classes.row} justify="space-between">
                    <Grid xs={8}>
                        <div className={classes.welcomeContainer}>
                            <div className={classes.welcomeInner}>
                                <Typography
                                    className={classes.welcomeTitle}
                                    color="secondary"
                                >
                                    Welcome, Ben!
                                </Typography>
                                <Typography
                                    className={classes.welcomeText}
                                    color="secondary"
                                >
                                    If this is your first time using Chameleo, take a tour of our features!
                                </Typography>
                                <div className={classes.flexGrow}></div>
                                <button className={classes.getStartedButton}>
                                    Get Started
                                </button>
                            </div>
                            <div className={classes.welcomeInner}>
                                <Image src={CloudGraphic} />
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={4}>
                        <div className={classes.whatsNewContainer}>
                            <div className={classes.whatsNewInner}>
                                <Typography
                                    className={classes.whatsNewText}
                                >
                                    What's New?
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className={classes.row} justify="space-between">
                    <Grid xs={12}>
                        <div className={classes.cpuUsageContainer}>
                            <div className={classes.cpuUsageInner}>
                                <Typography
                                    className={classes.cpuUsageTitle}
                                    color="secondary"
                                >
                                    CPU usage
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className={classes.row} justify="space-between">
                    <Grid xs={12}>
                        <div className={classes.containersContainer}>
                            <div className={classes.containersInner}>
                                <Typography
                                    className={classes.containersTitle}
                                    color="secondary"
                                >
                                    Containers
                                </Typography>
                                <table className={classes.containersTable}>
                                    <tr>
                                        <th className={classes.containersHeader}>
                                            <Checkbox 
                                                color="primary"
                                            />
                                        </th>
                                        <th className={classes.containersHeader}>Name</th>
                                        <th className={classes.containersHeader}>Type</th>
                                        <th className={classes.containersHeader}>Runtime</th>
                                        <th className={classes.containersHeader}>Status</th>
                                    </tr>
                                    <tr>
                                        <td className={classes.containersCell}>
                                            <Checkbox 
                                                color="secondary"
                                            />    
                                        </td>
                                        <td className={classes.containersCell}>
                                            New Container
                                        </td>
                                        <td className={classes.containersCell}>Authentication</td>
                                        <td className={classes.containersCell}>1d 23h</td>
                                        <td className={classes.containersCell}>
                                            Running
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: '20px',
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
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '20px'
    },
    row: {
        maxWidth: '100%',
        flexWrap: 'nowrap',
        columnGap: '20px',
        marginBottom: '20px'
    },
    welcomeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '300px',
        backgroundColor: '#C8FACD',
        backgroundImage: 'url("/img/welcome-bg.svg")',
        padding: '0 40px',
        boxShadow: theme.shadows['2']
    },
    welcomeInner: {
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
    },
    welcomeTitle: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '30px'
    },
    welcomeText: {
        fontSize: '16px'
    },
    getStartedButton: {
        width: '110px',
        height: '40px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
        fontWeight: 500,
        border: 'none',
        fontSize: '14px',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: theme.palette.background['dark']
        }
    },
    whatsNewContainer: {
        padding: '0 0 50px 30px',
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        boxShadow: theme.shadows['2'],
        display: 'grid',
        alignItems: 'end'
    },
    whatsNewInner: {

    },
    whatsNewText: {
        color: theme.palette.secondary.contrastText,
        fontSize: '20px',
        fontWeight: 700
    },
    flexGrow: {
        flexGrow: 1
    },
    cpuUsageContainer: {
        boxShadow: theme.shadows['2']
    },
    containersContainer: {
        boxShadow: theme.shadows['2'],
        padding: '20px'
    },
    containersTitle: {
        fontWeight: 600,
        fontSize: '18px'
    },
}))(DashboardMain);