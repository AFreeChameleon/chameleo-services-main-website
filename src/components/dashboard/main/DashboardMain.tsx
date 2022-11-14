import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Container } from '.prisma/client'; 
import {
    Breadcrumbs,
    Grid,
    Typography,
    Checkbox,
    Box,
    Button
} from '@mui/material';
import { styled } from '@mui/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import Flags from 'country-flag-icons/react/3x2';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon } from '../../Icons';
import CloudGraphic from '../../../img/cloud.svg';

import classes from './DashboardMain.module.scss';

const Container = styled(Box)(({theme}) => ({
    boxShadow: theme.shadows['2']
}));

type DashboardProps = {
    containers: Container[];
}

class DashboardMain extends React.Component<DashboardProps> {
    constructor(props) {
        super(props);
    }

    formatContainerType(type: string) {
        switch (type) {
            case 'auth':
                return 'Authentication';
            default:
                return 'Wrong container type';
        }
    }

    render() {
        const { containers }: any = this.props;
        

        return (
            <Box 
                className={classes.root} 
                sx={{ 
                    backgroundColor: (theme) => 
                        theme.palette.background.default 
                }}
            >
                <Typography 
                    gutterBottom
                    color="secondary"
                    className={classes.breadcrumbMain}
                >
                    Dashboard
                </Typography>
                <Grid 
                    container 
                    className={classes.row} 
                    justifyContent="space-between"
                >
                    <Grid xs={8}>
                        <Container 
                            className={classes.welcomeContainer}
                        >
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
                                <Button 
                                    sx={{ 
                                        backgroundColor: (theme) => 
                                            theme.palette.primary.main,
                                        color: (theme) => 
                                            theme.palette.secondary.contrastText,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: (theme) => 
                                                theme.palette.background['dark']
                                        }
                                    }}
                                    className={classes.getStartedButton} 
                                >
                                    Get Started
                                </Button>
                            </div>
                            <div className={classes.welcomeInner}>
                                <Image src={CloudGraphic} alt="Dashboard cloud" />
                            </div>
                        </Container>
                    </Grid>
                    <Grid xs={4}>
                        <Container 
                            className={classes.whatsNewContainer}
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.secondary.main
                            }}
                        >
                            <div className={classes.whatsNewInner}>
                                <Typography
                                    className={classes.whatsNewText}
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.secondary.contrastText
                                    }}
                                >
                                    What's New?
                                </Typography>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    className={classes.row} 
                    justifyContent="space-between"
                >
                    <Grid xs={12}>
                        <Container 
                            className={classes.cpuUsageContainer}
                        >
                            <div className={classes.cpuUsageInner}>
                                <Typography
                                    className={classes.cpuUsageTitle}
                                    color="secondary"
                                >
                                    CPU usage
                                </Typography>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    className={classes.row} 
                    justifyContent="space-between"
                >
                    <Grid xs={12}>
                        <Container 
                            className={classes.containersContainer}
                        >
                            <div className={classes.containersInner}>
                                <Typography
                                    className={classes.containersTitle}
                                    color="secondary"
                                >
                                    Containers
                                </Typography>
                                <table className={classes.containersTable}>
                                    <thead>
                                        <Box 
                                            component="tr" 
                                            className={classes.containersHeaders}
                                            sx={{
                                                borderBottom: (theme) => 
                                                    '1px solid ' + theme.palette.grey['50']
                                            }}
                                        >
                                            <th className={classes.containersHeader}>
                                                <Checkbox 
                                                    color="primary"
                                                />
                                            </th>
                                            <th className={classes.containersHeader}>Name</th>
                                            <th className={classes.containersHeader}>Type</th>
                                            <th className={classes.containersHeader}>Runtime</th>
                                            <th className={classes.containersHeader}>Status</th>
                                        </Box>
                                    </thead>
                                    <tbody>
                                        { containers.map((container) => (
                                            <tr>
                                                <td className={classes.containersCell}>
                                                    <Checkbox 
                                                        color="secondary"
                                                    />    
                                                </td>
                                                <td className={classes.containersCell}>
                                                {container.name}
                                                </td>
                                                <td className={classes.containersCell}>{this.formatContainerType(container.type)}</td>
                                                <td className={classes.containersCell}>1d 23h</td>
                                                <td className={classes.containersCell}>
                                                    Running
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default DashboardMain;