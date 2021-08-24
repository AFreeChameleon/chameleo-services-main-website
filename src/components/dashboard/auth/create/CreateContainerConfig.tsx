import React from 'react';
import NextLink from 'next/link';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

type CreateContainerConfigProps = {
    classes: any;
}

class CreateContainerConfig extends React.Component<CreateContainerConfigProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

            </div>
        )
    }
}

export default compose(
    connect(),
    withStyles((theme) => ({

    }))
)(CreateContainerConfig);