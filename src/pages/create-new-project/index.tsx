import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import createNewProjectStyles from '../../styles/create-new-project/createNewProjectStyles'; 

import Navbar from '../../components/Navbar';
import AttributeTable from '../../components/create-new-project/AttributeTable';
import PasswordConfig from '../../components/create-new-project/PasswordConfig';
import AuthenticationSettings from '../../components/create-new-project/AuthenticationSettings';
import CreateProject from '../../components/create-new-project/CreateProject';

class CreateNewProject extends Component {
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
                    category="Authentication"
                    username="Benamon"/>
                    
                <AttributeTable/>
                <PasswordConfig/>
                <AuthenticationSettings/>
                <CreateProject/>
            </div>
        )
    }
}

export default withStyles(createNewProjectStyles)(CreateNewProject);