import React from 'react';
import NextLink from 'next/link';

import {
    Breadcrumbs as MuiBreadcrumbs,
    Typography
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import classes from './Breadcrumbs.module.scss';

type BreadcrumbsProps = {
    steps: {
        text: string;
        href: string
    }[];
};

class Breadcrumbs extends React.Component<BreadcrumbsProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { steps } = this.props;
        const middleSteps = steps.length > 2 ? steps.slice(1, steps.length - 1) : [];

        return (
            <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                <NextLink href={steps[0].href}>
                    <Typography
                        className={classes.breadcrumb}
                    >
                        {steps[0].text}
                    </Typography>
                </NextLink>
                {middleSteps.map((step) => (
                    <NextLink href={step.href}>
                        <Typography
                            className={classes.breadcrumb}
                            sx={{ color: 'grey.A200' }}
                        >
                            {step.text}
                        </Typography>
                    </NextLink>
                ))}
                <Typography
                    color="secondary"
                    className={classes.breadcrumbMain}
                    sx={{ color: 'text.secondary' }}
                >
                    {steps[steps.length - 1].text}
                </Typography>
            </MuiBreadcrumbs>
        )
    }
}

export default Breadcrumbs;