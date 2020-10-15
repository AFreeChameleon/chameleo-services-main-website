import { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import dashboardStyles from '../styles/dashboard/dashboardStyles';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes
        }: any = this.props;
        return (
            <div className={classes.root}>

            </div>
        )
    }
}

export default withStyles(dashboardStyles)(Dashboard);