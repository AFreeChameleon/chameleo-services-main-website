import { Component } from 'react';
import ifAuth from '../../hoc/ifAuth';
import { Auth } from '../../auth/auth';
import { 
    Error,
    TableData,
    AuthSettings,
    PassConfig,
    OAuth
} from '../../types';

import { withStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab,
    Button
} from '@material-ui/core';
import TabPanel from '../../components/TabPanel';
import createNewProjectStyles from '../../styles/create-new-project/createNewProjectStyles'; 

import { createNewProjectStateDefaults as defaults } from '../../config/defaults';

import Navbar from '../../components/Navbar';
import ErrorList from '../../components/create-new-project/ErrorList';
import AttributeTable, { checkAttributeTable } from '../../components/create-new-project/AttributeTable';
import PasswordConfig from '../../components/create-new-project/PasswordConfig';
import AuthenticationSettings, { checkAuthenticationSettings } from '../../components/create-new-project/AuthenticationSettings';
import CreateProject from '../../components/create-new-project/CreateProject';
import OAuthSettings from '../../components/create-new-project/OAuthSettings';

class CreateNewProject extends Component<any, any> { 
    constructor(props) {
        super(props);
        this.state = {
            ...defaults,
            tab: 0
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
        const setOAuth = (oauth: OAuth) => this.setState({
            OAuth: oauth
        })
        const setErrors = (errors: string[]) => this.setState({
            errors: errors
        });

        const nextTab = (e) => {
            const errors = {
                attrTable: checkAttributeTable(this.state.attributeTable),
                authSettings: checkAuthenticationSettings({
                    secret: this.state.authenticationSettings.appSecret
                }),
            }
            console.log(errors)
            if (
                this.state.tab === 0 && 
                errors.attrTable.length > 0
            ) {
                this.setState({errors: errors.attrTable})
            } else if (
                this.state.tab === 2 && 
                errors.authSettings.length > 0
            ) {
                this.setState({errors: errors.authSettings})
            }
            else {
                this.setState({
                    tab: this.state.tab + 1,
                    errors: []
                });
            }
        }

        const setTab = (tab) => {
            this.setState({
                tab: tab,
            });
        }

        return (
            <div className={classes.root}>
                <Navbar
                    category="Authentication"
                    username="Benamon"
                />
                <div className={classes.inner}>
                    <Tabs
                        value={this.state.tab}
                        onChange={
                            (e, newVal) => this.setState({tab: newVal})
                        }
                        indicatorColor="secondary"
                        centered
                    >
                        <Tab label="User Model" disableRipple/>
                        <Tab label="Password Requirements" disableRipple/>
                        <Tab label="Session Settings" disableRipple/>
                        <Tab label="OAuth" disableRipple/>
                        <Tab label="Summary" disableRipple/>
                    </Tabs>
                    <ErrorList
                        errors={this.state.errors}
                    />
                    <TabPanel value={this.state.tab} index={0}>
                        <AttributeTable 
                            table={this.state.attributeTable} 
                            setTable={setAttributeTable}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={1}>
                        <PasswordConfig 
                            config={this.state.passwordConfig} 
                            setConfig={setPasswordConfig}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={2}>
                        <AuthenticationSettings 
                            settings={this.state.authenticationSettings} 
                            setSettings={setAuthenticationSettings}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={3}>
                        <OAuthSettings
                            oauth={this.state.OAuth}
                            setOAuth={setOAuth}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={4}>
                        <CreateProject 
                            state={this.state}
                            setErrors={setErrors}
                            setTab={setTab}
                        />
                    </TabPanel>
                    <div className={classes.tabButtons}>
                        <Button
                            disabled={this.state.tab === 0}
                            color="secondary"
                            onClick={(e) => {
                                this.setState({tab: this.state.tab - 1})
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={this.state.tab === 4}
                            onClick={nextTab}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(createNewProjectStyles)(ifAuth(CreateNewProject));