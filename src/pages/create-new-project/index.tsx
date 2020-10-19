import { Component } from 'react';
import { 
    Error,
    TableData,
    AuthSettings,
    PassConfig
} from '../../types';

import { withStyles } from '@material-ui/core/styles';
import createNewProjectStyles from '../../styles/create-new-project/createNewProjectStyles'; 

import { createNewProjectStateDefaults as defaults } from '../../config/defaults';

import Navbar from '../../components/Navbar';
import ErrorList from '../../components/create-new-project/ErrorList';
import AttributeTable from '../../components/create-new-project/AttributeTable';
import PasswordConfig from '../../components/create-new-project/PasswordConfig';
import AuthenticationSettings from '../../components/create-new-project/AuthenticationSettings';
import CreateProject from '../../components/create-new-project/CreateProject';

class CreateNewProject extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            ...defaults
        }
    }

    render() {
        const {
            classes,
        }: any = this.props;
        const setAttributeTable = (table: TableData[]) => this.setState({
            attributeTable: table
        });
        const setPasswordConfig = (config: PassConfig) => this.setState({
            passwordConfig: config
        });
        const setAuthenticationSettings = (settings: AuthSettings) => this.setState({
            authenticationSettings: settings
        });

        const pushError = (error: string) => this.setState({
            errors: [ ...this.state.errors, error ].filter((value, index, self) => self.indexOf(value) === index)
        });
        const removeError = (error: string) => this.setState({
            errors: [ ...this.state.errors.filter((errorItem: string) => errorItem != error) ]
        })
        const setErrors = (errors: string[]) => this.setState({
            errors: errors
        });

        console.log('re-render index')

        return (
            <div className={classes.root}>
                <Navbar
                    category="Authentication"
                    username="Benamon"/>
                <div className={classes.inner}>
                    <ErrorList
                        errors={this.state.errors}
                        setErrors={setErrors}/>
                    <AttributeTable 
                        table={this.state.attributeTable} 
                        setTable={setAttributeTable} 
                        pushError={pushError}
                        removeError={removeError}/>
                    <PasswordConfig 
                        config={this.state.passwordConfig} 
                        setConfig={setPasswordConfig}/>
                    <AuthenticationSettings 
                        settings={this.state.authenticationSettings} 
                        setSettings={setAuthenticationSettings}
                        pushError={pushError}
                        removeError={removeError}/>
                    <CreateProject 
                        state={this.state}
                        setErrors={setErrors} />
                </div>
            </div>
        )
    }
}

export default withStyles(createNewProjectStyles)(CreateNewProject);