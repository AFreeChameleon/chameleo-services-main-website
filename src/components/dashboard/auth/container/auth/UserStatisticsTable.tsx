import React from 'react';
import _ from 'lodash';

import { compose } from 'redux';
import { connect } from 'react-redux';

import Flags from 'country-flag-icons/react/3x2';

import {
    withStyles
} from '@material-ui/core/styles';

type UserStatisticsTableProps = {
    classes: any;
    users: any[];
    containerId: string;
    type: string;
};

type UserStatisticsTableState = {

};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class UserStatisticsTable extends React.Component<UserStatisticsTableProps, UserStatisticsTableState> {
    constructor(props) {
        super(props);

        this.createPercentages = this.createPercentages.bind(this);
        this.getFlagFromLocation = this.getFlagFromLocation.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    createPercentages(type) {
        const { users } = this.props;

        switch (type) {
            case 'location':
                let locationPercentages = {};
                const locations = _.uniqBy(users, (u) => u.location);
                for (const location of locations) {
                    locationPercentages[location] = (users.filter(u => u.location === location).length / users.length) * 100;   
                }
                return locationPercentages;
            case 'devices':
                let devicePercentages = {};
                const devices = _.uniqBy(users, (u) => u.device).map(u => u.device);
                console.log(devices)
                for (const device of devices) {
                    devicePercentages[device] = (users.filter(u => u.device === device).length / users.length) * 100;
                }
                return devicePercentages;
            case 'browser':
                let browserPercentages = {};
                const browsers = _.uniqBy(users, (u) => u.browser).map(u => u.browser);
                console.log(browsers)
                for (const browser of browsers) {
                    browserPercentages[browser] = (users.filter(u => u.browser === browser).length / users.length) * 100;
                }
                return browserPercentages;
        }
    }

    getFlagFromLocation(location: string) {
        // switch (location) {
        //     case 'london':
        //         return <Flags.GB />
        // }
    }

    createTable() {
        const { classes, type } = this.props;

        const locationPercentages = this.createPercentages(type);
        console.log(locationPercentages)
        return Object.keys(locationPercentages).map((p, i) => (
            <div className={classes.tableRow} key={i}>
                <div className={classes.tableTitle}>
                    { capitalizeFirstLetter(p) }
                </div>
                <div className={classes.tablePercentage}>
                    { locationPercentages[p] }
                </div>
            </div>
        ));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.tableContainer}>
                    { this.createTable() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.container.auth.stats.users
});

const mapDispatchToProps = (dispatch) => ({

});

export default compose<any>(
    withStyles((theme) => ({
        root: {
            marginTop: '20px'
        },
        tableRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '40px',
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
            padding: '0 10px'
        },
        tableTitle: {
            display: 'flex',
            alignItems: 'center',
            columnGap: '20px',
        }
    })),
    connect(mapStateToProps, mapDispatchToProps)
)(UserStatisticsTable)