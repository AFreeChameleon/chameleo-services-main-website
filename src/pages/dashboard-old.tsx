import { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import dashboardStyles from '../styles/dashboard/dashboardStyles';

import Navbar from '../components/Navbar';
import NewProjectCard from '../components/dashboard/NewProjectCard';

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
                <Navbar
                    category="Home"
                    username="Benamon"/>
                <NewProjectCard/>
            </div>
        )
    }
}

export default withStyles(dashboardStyles)(Dashboard);