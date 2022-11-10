import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { 
    Checkbox, 
    Breadcrumbs, 
    Menu, 
    MenuItem, 
    Typography, 
    ListItemIcon, 
    Stepper,
    Step as MuiStep,
    StepLabel as MuiStepLabel
} from '@mui/material';
import { styled } from '@mui/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CalendarIcon, LeftArrowIcon, RightArrowIcon, SettingsIcon } from '../../../Icons';
import CreateContainerConfig from './CreateContainerConfig';
import CreateContainerPricing from './CreateContainerPricing';
import CreateContainerLocation from './CreateContainerLocation';

import classes from './CreateContainerBody.module.scss';

const Step = styled(MuiStep)(({theme}) => ({
    root: {
        '& > div': {
            top: '15px',
            left: 'calc(-50% + 30px)',
            right: 'calc(50% + 30px)'
        }
    }
}));

const StepLabel = styled(MuiStepLabel)(({theme}) => ({
    root: {
        '& > span > svg': {
            fontSize: '30px'
        }
    }
}));

type NewAuthContainerBodyProps = {
}

type NewAuthContainerBodyState = {
    selectedPage: number;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps, NewAuthContainerBodyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0,
        }

        this.renderSelectedPage = this.renderSelectedPage.bind(this);
    }

    renderSelectedPage() {
        const { selectedPage } = this.state;
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        switch (selectedPage) {
            case 0:
                return <CreateContainerConfig changeSelectedPage={(val) => this.setState({ selectedPage: val })} />
            case 1:
                return <CreateContainerPricing changeSelectedPage={(val) => this.setState({ selectedPage: val })} />
            case 2:
                return <CreateContainerLocation changeSelectedPage={(val) => this.setState({ selectedPage: val })} />;
        }
    }

    render() {
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
                            <StepLabel>Choose the location</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>All done!</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                <div className={classes.pageContainer}>
                    { this.renderSelectedPage() }
                </div>
            </div>
        )
    }
}

export default NewAuthContainerBody;