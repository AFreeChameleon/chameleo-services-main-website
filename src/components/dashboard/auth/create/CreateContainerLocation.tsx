import React from 'react';
import Image from 'next/image';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, withStyles } from '@material-ui/core';
import { setContainerLocation } from '../../../../redux/container/auth/config/actions';
import WorldMap from '../../../../../public/img/worldmap.png'

type CreateContainerLocationProps = {
    classes: any;
    changeSelectedPage: (val: number) => void;
}

class CreateContainerLocation extends React.Component<CreateContainerLocationProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <Typography
                        variant="h5"
                    >
                        Pick a server location
                    </Typography>
                    <div className={classes.map}>
                        <Image 
                            src={WorldMap}
                            className={classes.mapImage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    dispatchSetContainerLocation: (value: string) => dispatch(setContainerLocation(value))
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        root: {
            marginTop: '40px'
        },
        container: {
            boxShadow: theme.shadows['2'],
            width: '100%',
            padding: '20px'
        },
        map: {
            paddingTop: '20px'
        },
        mapImage: {
            width: '100%',
            height: '580px'
        }
    }))
)(CreateContainerLocation);