import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Checkbox, Breadcrumbs, Menu, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import MuiStep from '@material-ui/core/Step';
import MuiStepLabel from '@material-ui/core/StepLabel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon, SettingsIcon } from '../../../Icons';

const Step = withStyles((theme) => ({
    root: {
        '& > div': {
            top: '15px',
            left: 'calc(-50% + 30px)',
            right: 'calc(50% + 30px)'
        }
    }
}))(MuiStep)

const StepLabel = withStyles((theme) => ({
    root: {
        '& > span > svg': {
            fontSize: '30px'
        }
    }
}))(MuiStepLabel);

type NewAuthContainerBodyProps = {
    classes: any;
}

type NewAuthContainerBodyState = {
    selectedPage: number;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps, NewAuthContainerBodyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0
        }
    }

    render() {
        const { classes } = this.props;
        const { selectedPage } = this.state;

        return (
            <div className={classes.root}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <NextLink href="/dashboard">
                        <div className={classes.breadcrumb}>Dashboard</div>
                    </NextLink>
                    <div className={classes.breadcrumbMain}>New Authentication Container</div>
                </Breadcrumbs>
                <div className={classes.stepperContainer}>
                    <Stepper activeStep={selectedPage} alternativeLabel>
                        <Step>
                            <StepLabel>Create your container</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Choose your payment plan</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>All done!</StepLabel>
                        </Step>
                    </Stepper>
                </div>
            </div>
        )
    }
}

export default compose(
    connect(),
    withStyles((theme) => ({
        root: {
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '20px'
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
        stepperContainer: {
            width: '820px',
            margin: '0 auto',
            paddingTop: '20px'
        }
    }))
)(NewAuthContainerBody);