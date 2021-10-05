import React from 'react';
import NextLink from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { MAIN_URL } from '../../../../globals';
import {
    addConfigModelRow,
    changeConfigModel,
    changeConfigModelLength,
    changeConfigPass,
    removeConfigModelRow,
    changeConfigAuth,
    changeConfigMail,
    changeConfigAuthOAuth,
    setConfigOAuthEnabled,
    setConfigErrors
} from '../../../../redux/container/auth/config/actions';
import {
    setErrorMessages,
    setErrorOpen
} from '../../../../redux/errors/actions';
import { 
    Breadcrumbs, 
    Select, 
    MenuItem, 
    Button, 
    RadioGroup, 
    Radio,
    Collapse,
    Snackbar,
    Typography,
    IconButton,
    Tooltip,
    FormControlLabel,
    Checkbox,
    TextField,
    Tabs,
    Tab,
    Input,
} from '@material-ui/core';
import GetInputFromType from '../../../dashboard/GetInputFromType';
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
    StyledSelect,
    NumberInputNoTicks,
    GreenButton,
} from '../../../Inputs';
import TabPanel from '../../../TabPanel';
import {
    checkConfig
} from '../../../../lib/container/validate';

const NameTextField = withStyles((theme) => ({
    root: {
        '& > div::before': {
            borderColor: '#ffffff'
        },
    }
}))(TextField);

type NewAuthContainerBodyProps = {
    classes?: any;
    config: { [key: string]: any };
    config_errors: string[];
    errors: string[];
    router: NextRouter;
    changeSelectedPage: (val: number) => void;
    dispatchChangeConfigModel: (rowName: string, key: string, value: any) => null;
    dispatchChangeConfigModelLength: (rowName: string, key: string, value: any) => null;
    dispatchRemoveConfigModelRow: (rowName: string) => null;
    dispatchAddConfigModelRow: () => null;
    dispatchChangeConfigPass: (key: string, value: any) => null;
    dispatchChangeConfigAuth: (key: string, value: any) => null;
    dispatchChangeConfigMail: (key: string, value: any) => null;
    dispatchChangeConfigAuthOAuth: (company: string, key: string, value: any) => null;
    dispatchSetConfigOAuthEnabled: (enabled: boolean) => null;
    dispatchSetConfigErrors: (errors: string[]) => null;
    dispatchSetErrorMessages: (values: string[]) => void;
    dispatchSetErrorOpen: (val: boolean) => void;
}

type NewAuthContainerBodyState = {
    selectedOAuthCompany: number;
    containerName: string;
    configTab: number;
    reviewError: string;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps, NewAuthContainerBodyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOAuthCompany: 0,
            containerName: 'New Container',
            configTab: 0,
            reviewError: ''
        }
    }

    minMaxEnabled(type: string) {
        switch (type) {
            case 'Date':
                return false;
            case 'DateTime':
                return false;
            case 'Boolean':
                return false;
            case 'Char':
                return false;
            default:
                return true;
        }
    }

    render() {
        const { 
            classes, 
            config, 
            config_errors,
            changeSelectedPage,
            dispatchChangeConfigModel, 
            dispatchChangeConfigModelLength, 
            dispatchRemoveConfigModelRow, 
            dispatchAddConfigModelRow,
            dispatchChangeConfigPass,
            dispatchChangeConfigAuth,
            dispatchChangeConfigMail,
            dispatchChangeConfigAuthOAuth,
            dispatchSetConfigOAuthEnabled,
            dispatchSetErrorMessages,
            dispatchSetErrorOpen
        } = this.props;
        const { selectedOAuthCompany, containerName, configTab, reviewError } = this.state;
        return (
            <div className={classes.root}>
                {/* <Snackbar open={config_errors.length > 0} autoHideDuration={6000}>
                    <div>
                        { config_errors.map((error, i) => (
                            <Alert variant="filled" severity="error" className={classes.errorAlert} key={i}>
                                {error}
                            </Alert> 
                        )) }
                    </div>
                </Snackbar> */}
                <div className={classes.tabsContainer}>
                    <Tabs 
                        indicatorColor="primary"
                        value={configTab} 
                        onChange={(e, newValue) => {
                            if (
                                !(config.mail.resetRedirectURI && config.mail.resetContent && config.mail.resetSubject &&
                                config.mail.verifyRedirectURI && config.mail.verifyContent && config.mail.verifySubject &&
                                config.mail.fromAddress)
                            ) {
                                dispatchChangeConfigMail('enabled', false);
                            } else {
                                dispatchChangeConfigMail('enabled', true);
                            }
                            if (
                                !(config.auth.oauth.google.clientID && 
                                config.auth.oauth.google.clientSecret &&
                                config.auth.oauth.google.redirectURI)
                            ) {
                                dispatchSetConfigOAuthEnabled(false);
                            } else {
                                dispatchSetConfigOAuthEnabled(true);
                            }
                            this.setState({
                                configTab: newValue
                            });
                        }}
                    >
                        <Tab label="User Model" />
                        <Tab label="Registration" />
                        <Tab label="Mail" />
                        <Tab label="OAuth" />
                        <Tab label="Review" />
                    </Tabs>
                    <div className={classes.container}>
                        <TabPanel value={configTab} index={0}>
                            <div className={classes.title}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    User Model
                                </Typography>
                                <Typography
                                    variant="caption"
                                    gutterBottom
                                >
                                    Select properties for your user
                                </Typography>
                            </div>
                            <div className={classes.tableContainer}>
                                <div className={classes.tableHeaders}>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Name
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Attributes
                                        </Typography>
                                    </div>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Default
                                        </Typography>
                                    </div>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Type
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader} ${classes.center}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Max. Length
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader} ${classes.center}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Min. Length
                                        </Typography>
                                    </div>
                                </div>
                                <div className={classes.tableBody}>
                                    { config.model.map((row, i) => (
                                        <div className={classes.tableRow} key={i}>
                                            <div className={classes.tableColumn}>
                                                <NameTextField
                                                    placeholder="Column Name"
                                                    className={classes.invisibleInput}
                                                    value={row.name}
                                                    onChange={(e) => 
                                                        dispatchChangeConfigModel(row.name, 'name', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div id={`attributes-${i}`} className={`${classes.tableColumn} ${classes.tableColumnPaddingBottom}`}>
                                                <Select
                                                    multiple
                                                    fullWidth
                                                    input={<Input />}
                                                    value={row.attributes}
                                                    renderValue={(selected: any) => selected.join(', ')}
                                                    MenuProps={{
                                                        getContentAnchorEl: () => null
                                                    }}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigModel(row.name, 'attributes', e.target.value)
                                                    }}
                                                >
                                                    <MenuItem value="Email" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Email')} color="primary" />
                                                        Email
                                                    </MenuItem>
                                                    <MenuItem value="Password" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Password')} color="primary" />
                                                        Password
                                                    </MenuItem>
                                                    <MenuItem value="Username" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Username')} color="primary" />
                                                        Username
                                                    </MenuItem>
                                                    <MenuItem value="Phone number" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Phone number')} color="primary" />
                                                        Phone number
                                                    </MenuItem>
                                                    <MenuItem value="Verifiable" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Verifiable')} color="primary" />
                                                        Verifiable
                                                    </MenuItem>
                                                    <MenuItem value="Unique" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Unique')} color="primary" />
                                                        Unique
                                                    </MenuItem>
                                                    <MenuItem value="Required" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Required')} color="primary" />
                                                        Required
                                                    </MenuItem>
                                                </Select>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                {/* <TextField
                                                    disabled
                                                    className={classes.invisibleInput}
                                                /> */}
                                                {/* <TextField
                                                    value={row.default}
                                                    className={classes.invisibleInput}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigModel(row.name, 'default', e.target.value)
                                                    }}
                                                /> */}
                                                { row.attributes.includes('Required') ? (
                                                    <Tooltip title={"Can't be edited if the row is required."}>
                                                        <TextField
                                                            disabled
                                                            className={classes.invisibleInput}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <GetInputFromType
                                                        type={row.type} 
                                                        colName={'Default'}
                                                        value={row.default} 
                                                        className={classes.invisibleInput}
                                                        onChange={(newValue) => dispatchChangeConfigModel(row.name, 'default', newValue)} 
                                                    />

                                                ) }
                                            </div>
                                            <div className={`${classes.tableColumn} ${classes.tableColumnPaddingBottom}`}>
                                                <Select
                                                    variant="standard"
                                                    value={row.type}
                                                    fullWidth
                                                    input={<StyledSelect/>}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigModel(row.name, 'type', e.target.value)
                                                    }}
                                                >
                                                    <MenuItem value="String" className={classes.menuItem}>String</MenuItem>
                                                    <MenuItem value="Char" className={classes.menuItem}>Char</MenuItem>
                                                    <MenuItem value="Int" className={classes.menuItem}>Int</MenuItem>
                                                    <MenuItem value="Float" className={classes.menuItem}>Float</MenuItem>
                                                    <MenuItem value="JSON" className={classes.menuItem}>JSON</MenuItem>
                                                    <MenuItem value="Boolean" className={classes.menuItem}>Boolean</MenuItem>
                                                    <MenuItem value="Date" className={classes.menuItem}>Date</MenuItem>
                                                    <MenuItem value="DateTime" className={classes.menuItem}>DateTime</MenuItem>
                                                    <MenuItem value="Any" className={classes.menuItem}>Any</MenuItem>
                                                </Select>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                {
                                                    this.minMaxEnabled(row.type) ? (
                                                        <NumberInputNoTicks
                                                            value={
                                                                row.length && 
                                                                    (!isNaN(row.length.min) ?
                                                                    row.length.min : 
                                                                    ''
                                                            )}
                                                            className={`${classes.invisibleInput} ${classes.center}`}
                                                            onChange={(e) => {
                                                                dispatchChangeConfigModelLength(row.name, 'min', parseInt(e.target.value))
                                                            }}
                                                        />
                                                    ) : (
                                                        <Tooltip title={"Can't be edited if the row has a type of Date, DateTime, Boolean or Char."}>
                                                            <NumberInputNoTicks
                                                                disabled
                                                                className={`${classes.invisibleInput} ${classes.center}`}
                                                                value={''}
                                                            />
                                                        </Tooltip>
                                                    )
                                                }
                                            </div>
                                            <div className={classes.tableColumn}>
                                                {
                                                    this.minMaxEnabled(row.type) ? (
                                                        <NumberInputNoTicks
                                                            value={
                                                                row.length && 
                                                                    (!isNaN(row.length.max) ? 
                                                                    row.length.max : 
                                                                    ''
                                                            )}
                                                            className={`${classes.invisibleInput} ${classes.center}`}
                                                            onChange={(e) => {
                                                                dispatchChangeConfigModelLength(row.name, 'max', parseInt(e.target.value))
                                                            }}
                                                        />
                                                    ) : (
                                                        <Tooltip title={"Can't be edited if the row has a type of Date, DateTime, Boolean or Char."}>
                                                            <NumberInputNoTicks
                                                                disabled
                                                                className={`${classes.invisibleInput} ${classes.center}`}
                                                                value={''}
                                                            />
                                                        </Tooltip>
                                                    )
                                                }
                                            </div>
                                            <div className={`${classes.modelColumn} ${classes.center}`}>
                                                <IconButton
                                                    onClick={(e) => {
                                                        dispatchRemoveConfigModelRow(row.name);
                                                    }}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            </div>
                            <div className={classes.addModelRowButton}>
                                <GreenButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        this.setState({ configTab: 1 })
                                    }}
                                    endIcon={<ArrowForwardIcon/>}
                                >
                                    Next
                                </GreenButton>
                                <GreenButton
                                    color="primary"
                                    variant="outlined"
                                    onClick={(e) => {
                                        dispatchAddConfigModelRow();
                                    }}
                                    endIcon={<AddIcon/>}
                                >
                                    Add New Row
                                </GreenButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={configTab} index={1}>
                            <div className={classes.title}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    Password Settings
                                </Typography>
                                <Typography
                                    variant="caption"
                                >
                                    What to look for in a password when a user registers
                                </Typography>
                            </div>
                            <div className={classes.passwordCheckboxContainer}>
                                <div className={classes.passwordCheckbox}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color="primary"
                                                checked={config.pass.uppercase} 
                                                onChange={(e) => {
                                                    dispatchChangeConfigPass('uppercase', e.target.checked);
                                                }} 
                                            />
                                        }
                                        label="Uppercase letters"
                                    />
                                </div>
                                <div className={classes.passwordCheckbox}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color="primary"
                                                checked={config.pass.lowercase} 
                                                onChange={(e) => {
                                                    dispatchChangeConfigPass('lowercase', e.target.checked);
                                                }} 
                                            />
                                        }
                                        label="Lowercase letters"
                                    />
                                </div>
                                <div className={classes.passwordCheckbox}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color="primary"
                                                checked={config.pass.requireNumbers} 
                                                onChange={(e) => {
                                                    dispatchChangeConfigPass('requireNumbers', e.target.checked);
                                                }} 
                                            />
                                        }
                                        label="Require numbers"
                                    />
                                </div>
                                <div className={classes.passwordCheckbox}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color="primary"
                                                checked={config.pass.requireSpecialChars} 
                                                onChange={(e) => {
                                                    dispatchChangeConfigPass('requireSpecialChars', e.target.checked);
                                                }} 
                                            />
                                        }
                                        label="Require special characters"
                                    />
                                </div>
                            </div>
                            <Typography
                                variant="subtitle2"
                                className={classes.subtitle}
                                component="div"
                            >
                                Registration policies
                            </Typography>
                            <RadioGroup
                                className={classes.sessionRadioButtons}
                                value={config.auth.userSignUp}
                                onChange={(e) => {
                                    dispatchChangeConfigAuth('userSignUp', (e.target.value === 'true'))
                                }}
                            >
                                <FormControlLabel
                                    value={true}
                                    label="Allow users to register"
                                    control={<Radio color="primary"/>}
                                    className={classes.passwordCheckbox}
                                />
                                <FormControlLabel
                                    value={false}
                                    label="Only allow administrators to make an account"
                                    control={<Radio color="primary"/>}
                                    className={classes.passwordCheckbox}
                                />
                            </RadioGroup>
                            <div className={classes.sessionExpiresInContainer}>
                                <Typography 
                                    variant="subtitle2"
                                    className={classes.subtitle}
                                    component="div"
                                >
                                    Session expires in
                                </Typography>
                                <div className={classes.sessionExpiresInCheckbox}>
                                    <FormControlLabel
                                        label="Never"
                                        className={classes.passwordCheckbox}
                                        control={<Checkbox
                                            color="primary"
                                            checked={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                                            onChange={(e) => {
                                                dispatchChangeConfigAuth('sessionExpiresIn', {
                                                    ...config.auth.sessionExpiresIn,
                                                    forever: e.target.checked
                                                });
                                            }}
                                        />}
                                    />
                                </div>
                                <div className={classes.sessionExpiresInTime}>
                                    <div className={classes.sessionExpiresInColumn}>
                                        <NumberInputNoTicks
                                            className={classes.listItemColumnFull}
                                            label="Days"
                                            color="primary"
                                            type="number"
                                            value={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.days}
                                            disabled={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                                            fullWidth
                                            onChange={(e) => {
                                                dispatchChangeConfigAuth('sessionExpiresIn', {
                                                    ...config.auth.sessionExpiresIn,
                                                    days: parseInt(e.target.value)
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className={classes.sessionExpiresInColumn}>
                                        <NumberInputNoTicks
                                            className={classes.listItemColumnFull}
                                            label="Hours"
                                            color="primary"
                                            type="number"
                                            value={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.hours}
                                            disabled={config.auth.sessionExpiresIn && config.auth.sessionExpiresIn.forever}
                                            fullWidth
                                            onChange={(e) => {
                                                dispatchChangeConfigAuth('sessionExpiresIn', {
                                                    ...config.auth.sessionExpiresIn,
                                                    hours: parseInt(e.target.value)
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.nextButton}>
                                <GreenButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        this.setState({ configTab: 2 })
                                    }}
                                    endIcon={<ArrowForwardIcon/>}
                                >
                                    Next
                                </GreenButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={configTab} index={2}>
                            <div className={classes.title}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    Mail Configuration
                                </Typography>
                                <Typography
                                    variant="caption"
                                    gutterBottom
                                >
                                    How your verification and reset emails will look
                                </Typography>
                            </div>
                            <div className={classes.fromAddress}>
                                {/* <FormControlLabel 
                                    label="Disable Mailing"
                                    className={classes.passwordCheckbox}
                                    control={<Checkbox
                                        color="primary"
                                        checked={!config.mail.enabled}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('enabled', !e.target.checked);
                                        }}
                                    />}
                                /> */}
                                <a href="#" className={classes.skipLink} onClick={() => {
                                    dispatchChangeConfigMail('enabled', false);
                                    this.setState({ configTab: 3 });
                                }} >Skip mailing</a>
                            </div>
                            <div className={classes.fromAddress}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    From Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="john.doe@company.com"
                                    color="primary"
                                    value={config.mail.fromAddress}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('fromAddress', e.target.value);
                                    }}
                                />
                            </div>
                            <div className={classes.emailSubject}>
                                <Typography
                                    variant="h5"
                                    className={classes.emailHeader}
                                >
                                    Account verification email
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Email Subject
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Verify your email!"
                                    color="primary"
                                    value={config.mail.verifySubject}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('verifySubject', e.target.value);
                                    }}
                                />
                            </div>
                            <div className={classes.emailHTML}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Email Content
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={10}
                                    placeholder="Accepts HTML or plain text"
                                    color="primary"
                                    value={config.mail.verifyContent}
                                    className={classes.multilineInput}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('verifyContent', e.target.value);
                                    }}
                                    helperText="{__verify__} will be replaced with the link or code depending on which you choose"
                                />
                            </div>
                            <div className={classes.emailRedirection}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Redirection URI
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="https://website.com/verified"
                                    color="primary"
                                    value={config.mail.verifyRedirectURI}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('verifyRedirectURI', e.target.value);
                                    }}
                                    helperText="Where you want to send the user after they have been verified"
                                />
                            </div>
                            <div className={classes.emailSubject}>
                                <Typography
                                    variant="h5"
                                    className={classes.emailHeader}
                                >
                                    Reset password email
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Email Subject
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Reset your password!"
                                    color="primary"
                                    value={config.mail.resetSubject}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('resetSubject', e.target.value);
                                    }}
                                />
                            </div>
                            <div className={classes.emailHTML}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Email Content
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={10}
                                    placeholder="Accepts HTML or plain text"
                                    color="primary"
                                    value={config.mail.resetContent}
                                    className={classes.multilineInput}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('resetContent', e.target.value);
                                    }}
                                    helperText="{__password__} will be replaced with the temporary password"
                                />
                            </div>
                            <div className={classes.emailRedirection}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    Redirection URI
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="https://website.com/verified"
                                    color="primary"
                                    value={config.mail.resetRedirectURI}
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('resetRedirectURI', e.target.value);
                                    }}
                                    helperText="Where you want to send the user after they have reset their password"
                                />
                            </div>
                            <div className={classes.nextButton}>
                                <GreenButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        if (
                                            !(config.mail.resetRedirectURI && config.mail.resetContent && config.mail.resetSubject &&
                                            config.mail.verifyRedirectURI && config.mail.verifyContent && config.mail.verifySubject &&
                                            config.mail.fromAddress)
                                        ) {
                                            dispatchChangeConfigMail('enabled', false);
                                        } else {
                                            dispatchChangeConfigMail('enabled', true);
                                        }
                                        this.setState({ configTab: 3 });
                                    }}
                                    endIcon={<ArrowForwardIcon/>}
                                >
                                    Next
                                </GreenButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={configTab} index={3}>
                            <div className={classes.title}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    OAuth
                                </Typography>
                                <Typography
                                    variant="caption"
                                    gutterBottom
                                >
                                    Allow users to sign up through other methods
                                </Typography>
                            </div>
                            {/* <div>
                                <FormControlLabel 
                                    label="Disable OAuth"
                                    className={classes.passwordCheckbox}
                                    control={<Checkbox
                                        color="primary"
                                        checked={!config.auth.oauth.enabled}
                                        onChange={(e) => {
                                            dispatchSetConfigOAuthEnabled(!e.target.checked);
                                        }}
                                    />}
                                />
                            </div> */}
                            <div className={classes.fromAddress}>
                                <a href="#" className={classes.skipLink} onClick={() => {
                                    dispatchSetConfigOAuthEnabled(false);
                                    this.setState({ configTab: 4 });
                                }} >Skip OAuth</a>
                            </div>
                            <div className={classes.oauthContainer}>
                                <div className={classes.oauthTabs}>
                                    <Tabs
                                        textColor="primary"
                                        indicatorColor="primary"
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={selectedOAuthCompany}
                                        onChange={(e, newValue) => this.setState({ selectedOAuthCompany: newValue })}
                                    >
                                        <Tab label="Google"/>
                                        {/* <Tab label="Twitter" /> */}
                                    </Tabs>
                                    <div className={classes.oauthFormContainer}>
                                        <TabPanel value={selectedOAuthCompany} index={0}>
                                            <div className={classes.title}>
                                                <Typography
                                                    variant="h5"
                                                >
                                                    Google
                                                </Typography>
                                            </div>
                                            <div className={classes.oauthInput}>
                                                <TextField
                                                    fullWidth
                                                    label="Client ID"
                                                    color="primary"
                                                    value={config.auth.oauth.google.clientID}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigAuthOAuth('google', 'clientID', e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className={classes.oauthInput}>
                                                <TextField
                                                    fullWidth
                                                    label="Client Secret"
                                                    color="primary"
                                                    value={config.auth.oauth.google.clientSecret}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigAuthOAuth('google', 'clientSecret', e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className={classes.oauthInput}>
                                                <TextField
                                                    fullWidth
                                                    label="Redirect URI"
                                                    color="primary"
                                                    value={config.auth.oauth.google.redirectURI}
                                                    onChange={(e) => {
                                                        dispatchChangeConfigAuthOAuth('google', 'redirectURI', e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.submitButton}>
                                <GreenButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        if (
                                            !(config.auth.oauth.google.clientID && 
                                            config.auth.oauth.google.clientSecret &&
                                            config.auth.oauth.google.redirectURI)
                                        ) {
                                            dispatchSetConfigOAuthEnabled(false);
                                        } else {
                                            dispatchSetConfigOAuthEnabled(true);
                                        }
                                        this.setState({ configTab: 4 });
                                    }}
                                    endIcon={<ArrowForwardIcon/>}
                                >
                                    Next
                                </GreenButton>
                            </div>
                        </TabPanel>
                        <TabPanel value={configTab} index={4}>
                            <div className={classes.title}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    Review
                                </Typography>
                                <Typography
                                    variant="caption"
                                    gutterBottom
                                >
                                    See your changes before you save
                                </Typography>
                            </div>
                            { reviewError && <Alert variant="filled" severity="error" className={classes.errorAlert}>
                                {reviewError}
                            </Alert> }
                            <div className={classes.reviewSection}>
                                <div className={classes.reviewTableHeaders}>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Name
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Attributes
                                        </Typography>
                                    </div>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Default
                                        </Typography>
                                    </div>
                                    <div className={classes.tableHeader}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Type
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader} ${classes.center}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Max. Length
                                        </Typography>
                                    </div>
                                    <div className={`${classes.tableHeader} ${classes.center}`}>
                                        <Typography
                                            variant="body1"
                                            className={classes.tableHeaderText}
                                        >
                                            Min. Length
                                        </Typography>
                                    </div>
                                </div>
                                <div className={classes.tableBody}>
                                    { config.model.map((row, i) => (
                                        <div className={classes.reviewTableRow} key={i}>
                                            <div className={classes.tableColumn}>
                                                <Typography className={`${classes.reviewTablePadding} ${classes.reviewTableCell}`}>
                                                    {row.name}
                                                </Typography>
                                            </div>
                                            <div className={`${classes.tableColumn}`}>
                                                <Typography className={`${classes.reviewTableCell}`}>
                                                    {row.attributes.length > 0 ? row.attributes.join(', ') : 'null'}
                                                </Typography>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                <Typography className={`${classes.reviewTableCell}`}>
                                                    { !row.attributes.includes('Required') ? (row.default ? row.default : 'null') : 'n/a' }
                                                </Typography>
                                            </div>
                                            <div className={`${classes.tableColumn}`}>
                                                <Typography className={`${classes.reviewTableCell}`}>
                                                    { row.type }
                                                </Typography>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                <Typography className={`${classes.reviewTableCell} ${classes.center}`}>
                                                    { this.minMaxEnabled(row.type) ? row.length.min : 'n/a' }
                                                </Typography>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                <Typography className={`${classes.reviewTableCell} ${classes.center}`}>
                                                    { this.minMaxEnabled(row.type) ? row.length.max : 'n/a' }
                                                </Typography>
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            </div>
                            <div className={classes.reviewSection}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className={classes.reviewHeader}
                                >
                                    Password requirements
                                </Typography>
                                {config.pass.uppercase && <Typography
                                    gutterBottom
                                >
                                    • At least one uppercase letter
                                </Typography> }
                                {config.pass.lowercase && <Typography
                                    gutterBottom
                                >
                                    • At least one lowercase letter
                                </Typography> }
                                { config.pass.requireNumbers && <Typography
                                    gutterBottom
                                >
                                    • At least one number
                                </Typography>}
                                { config.pass.requireSpecialChars && <Typography
                                    gutterBottom
                                >
                                    • At least one special character
                                </Typography>}
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className={classes.reviewHeader}
                                >
                                    Registration policy
                                </Typography>
                                {config.auth.userSignUp ? <Typography
                                    gutterBottom
                                >
                                    Allow users to register
                                </Typography> : <Typography>
                                    Only allow administrators to make an account
                                </Typography>}
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className={classes.reviewHeader}
                                >
                                    Session expires in
                                </Typography>
                                {config.auth.sessionExpiresIn.forever ? <Typography
                                >
                                    Never
                                </Typography> : <Typography
                                >
                                    {config.auth.sessionExpiresIn.days} days, {config.auth.sessionExpiresIn.hours} hours
                                </Typography>}
                            </div>
                            <div className={classes.reviewSection}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className={classes.reviewHeader}
                                >
                                    Mail Configuration
                                </Typography>
                                {config.mail.enabled ? (<>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        From address
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                    >
                                        {config.mail.fromAddress ? config.mail.fromAddress : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Account verification email subject
                                    </Typography>
                                    <Typography>
                                        {config.mail.verifySubject ? config.mail.verifySubject : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Account verification email html
                                    </Typography>
                                    <Typography>
                                        {config.mail.verifyContent ? config.mail.verifyContent : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Account verification redirect URI
                                    </Typography>
                                    <Typography>
                                        {config.mail.verifyRedirectURI ? config.mail.verifyRedirectURI : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Reset password email subject
                                    </Typography>
                                    <Typography>
                                        {config.mail.resetSubject ? config.mail.resetSubject : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Reset password email html
                                    </Typography>
                                    <Typography>
                                        {config.mail.resetContent ? config.mail.resetContent : 'Null'}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        className={classes.reviewSubHeader}
                                    >
                                        Reset password redirect URI
                                    </Typography>
                                    <Typography>
                                        {config.mail.resetRedirectURI ? config.mail.resetRedirectURI : 'Null'}
                                    </Typography>
                                </>) : (<Typography>
                                    Disabled
                                </Typography>)}
                            </div>
                            <div className={classes.reviewSection}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className={classes.reviewHeader}
                                >
                                    OAuth
                                </Typography>
                                { config.auth.oauth.enabled ? (
                                    (config.auth.oauth.google.clientID || 
                                    config.auth.oauth.google.clientSecret || 
                                    config.auth.oauth.google.redirectURI) && (<>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            className={classes.reviewSubHeader}
                                        >
                                            Google client ID
                                        </Typography>
                                        <Typography>
                                            {config.auth.oauth.google.clientID ? config.auth.oauth.google.clientID : 'Null'}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            className={classes.reviewSubHeader}
                                        >
                                            Google client secret
                                        </Typography>
                                        <Typography>
                                            {config.auth.oauth.google.clientSecret ? config.auth.oauth.google.clientSecret : 'Null'}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            className={classes.reviewSubHeader}
                                        >
                                            Google redirect URI
                                        </Typography>
                                        <Typography>
                                            {config.auth.oauth.google.redirectURI ? config.auth.oauth.google.redirectURI : 'Null'}
                                        </Typography>
                                    </>)
                                ) : (<Typography>
                                    Disabled
                                </Typography>)}
                            </div>
                            <div className={classes.reviewSection}>
                                <Button
                                    // fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        const validate = checkConfig(config);
                                        if (!validate.error) {
                                            dispatchSetErrorMessages([]);
                                            changeSelectedPage(1)
                                        } else {
                                            setTimeout(() => {
                                                dispatchSetErrorOpen(true);
                                                dispatchSetErrorMessages([validate.message]);
                                            }, 100);
                                        }
                                    }}
                                    endIcon={<SaveIcon/>}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    config: state.container.auth.config.data,
    config_errors: state.container.auth.config.errors,
    errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeConfigModel: (rowName: string, key: string, value: any) => dispatch(changeConfigModel(rowName, key, value)),
    dispatchChangeConfigModelLength: (rowName: string, key: string, value: any) => dispatch(changeConfigModelLength(rowName, key, value)),
    dispatchRemoveConfigModelRow: (rowName: string) => dispatch(removeConfigModelRow(rowName)),
    dispatchAddConfigModelRow: () => dispatch(addConfigModelRow()),
    dispatchChangeConfigPass: (key: string, value: any) => dispatch(changeConfigPass(key, value)),
    dispatchChangeConfigAuth: (key: string, value: any) => dispatch(changeConfigAuth(key, value)),
    dispatchChangeConfigMail: (key: string, value: any) => dispatch(changeConfigMail(key, value)),
    dispatchChangeConfigAuthOAuth: (company: string, key: string, value: any) => dispatch(changeConfigAuthOAuth(company, key, value)),
    dispatchSetConfigErrors: (errors: string[]) => dispatch(setConfigErrors(errors)),
    dispatchSetConfigOAuthEnabled: (enabled: boolean) => dispatch(setConfigOAuthEnabled(enabled)),
    dispatchSetErrorMessages: (values: string[] | []) => dispatch(setErrorMessages(values)),
    dispatchSetErrorOpen: (val: boolean) => dispatch(setErrorOpen(val))
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        root: {
            padding: '10px 15px',
        },
        tabsContainer: {
            width: 'fit-content',
            margin: '0 auto'
        },
        errorAlert: {
            marginTop: '10px',
            width: '100%'
        },
        breadcrumb: {
            color: '#6F6F76',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        },
        breadcrumbMain: {
            color: '#ffffff'
        },
        listItemColumnFull: {
            '& > div > input': {
                textAlign: 'left'
            }
        },
        container: {
            width: '1100px',
            // marginTop: '40px',
            padding: '20px',
            boxShadow: theme.shadows['2']
        },
        multilineInput: {
            '& textarea': {
                whiteSpace: 'pre'
            }
        },
        smallContainer: {
            maxWidth: '550px',
            marginTop: '20px',
            marginBottom: '20px',
            padding: '20px',
            boxShadow: theme.shadows['2']
        },
        oauthContainer: {
            maxWidth: '550px',
            marginTop: '20px',
            marginBottom: '20px',
        },
        oauthTabs: {
            display: 'flex'
        },
        oauthFormContainer: {
            // boxShadow: theme.shadows['2'],
            padding: '10px 20px 20px 20px',
            flexGrow: 1,
            borderLeft: `1px solid rgba(0, 0, 0, 0.12)`
        },
        title: {
            fontSize: '16px',
            fontWeight: 500,
            // paddingBottom: '20px'
        },
        tableContainer: {
            marginTop: '10px'
        },
        tableHeaders: {
            display: 'grid',
            gridTemplateColumns: '20% 27% 15% 11% 11% 10% 6%',
            width: '100%',
            height: '60px',
            backgroundColor: theme.palette.primary.main,
            alignItems: 'center',
            padding: '0 5px'
        },
        tableHeader: {
            padding: '0 5px',
        },
        tableHeaderText: {
            color: theme.palette.primary.contrastText,
            fontWeight: 600
        },
        tableBody: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px',
            paddingTop: '5px'
        },
        tableRow: {
            display: 'grid',
            gridTemplateColumns: '20% 27% 15% 11% 11% 10% 6%',
            width: '100%',
            height: '60px',
            alignItems: 'center',
            borderRadius: '5px',
        },
        reviewTableHeaders: {
            display: 'grid',
            gridTemplateColumns: '26% 27% 15% 11% 11% 10%',
            width: '100%',
            height: '60px',
            backgroundColor: theme.palette.primary.main,
            alignItems: 'center',
            padding: '0 5px'
        },
        reviewTableRow: {
            display: 'grid',
            gridTemplateColumns: '26% 27% 15% 11% 11% 10%',
            width: '100%',
            height: '60px',
            alignItems: 'center',
            borderRadius: '5px',
            borderBottom: `1px solid ${theme.palette.grey['200']}`
        },
        tableColumn: {
            padding: '0 5px',
        },
        tableColumnPaddingBottom: {
            paddingBottom: '8px'
        },
        center: {
            textAlign: 'center'
        },
        tableTooltip: {
            fontSize: '12px',
            color: '#6F6F76',
            paddingBottom: '5px'
        },
        invisibleInput: {
            border: 'none',
            outline: 'none',
            height: '40px',
            paddingLeft: '8px',
            width: '100%',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: theme.palette.text.secondary,
            '&:disabled': {
                backgroundColor: 'rgb(0, 0, 0, 0.1)'
            }
        },
        menuItem: {
        },
        addModelRowButton: {
            padding: '10px 10px 0 0px',
            display: 'flex',
            justifyContent: 'space-between'
        },
        passwordCheckboxContainer: {
            paddingTop: '10px'
        },
        passwordCheckbox: {
            paddingLeft: '10px',
            paddingTop: '2px'
        },
        sessionExpiresInContainer: {
            paddingTop: '10px'
        },
        sessionRadioButtons: {
            // paddingTop: '5px'
        },
        sessionExpiresInTime: {
            display: 'flex',
            columnGap: '10px',
            paddingLeft: '10px',
            paddingTop: '5px',
            paddingBottom: '5px'
        },
        sessionExpiresInColumn: {
            width: '200px'
        },
        enableEmailing: {
            paddingTop: '5px'
        },
        fromAddress: {
            width: '415px',
            paddingTop: '20px'
        },
        verificationRadioButtons: {
            paddingBottom: '10px'
        },
        emailSubject: {
            width: '415px',
            paddingTop: '30px'
        },
        emailHTML: {
            paddingTop: '20px'
        },
        emailRedirection: {
            width: '415px',
            paddingTop: '20px',
        },
        emailHeader: {
            marginBottom: '1.5em'
        },
        subtitle: {
            paddingTop: '10px',
        },
        oauthGrid: {
            display: 'flex',
            paddingTop: '10px',
            columnGap: '10px'
        },
        oauthList: {
            width: '250px',
            backgroundColor: '#212121',
            borderRadius: '5px',
            padding: '5px'
        },
        oauthItem: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            paddingLeft: '10px',
            // borderBottom: '1px solid #6F6F76',
            // borderTopRightRadius: '5px',
            // borderTopLeftRadius: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.palette.secondary.main
            }
        },
        oauthForm: {
            width: '500px',
            padding: '5px 0'
        },
        oauthInput: {
            paddingTop: '10px'
        },
        oauthItemSelected: {
            backgroundColor: theme.palette.secondary.main,
            fontWeight: 500
        },
        submitButton: {
            maxWidth: '550px',
            marginTop: '10px',
            borderRadius: '10px',
            display: 'flex',
            columnGap: '10px'
        },
        containerName: {
            width: '415px',
            padding: '10px 0px 0px 10px'
        },
        nextButton: {
            paddingTop: '20px'
        },
        reviewTablePadding: {
            padding: '0px 8px 8px 8px'
        },
        reviewSection: {
            marginTop: '20px'
        },
        reviewHeader: {
            marginTop: '40px'
        },
        reviewSubHeader: {
            marginTop: '20px'
        },
        skipLink: {
            color: theme.palette.primary.main
        },
    })), 
)(withRouter(NewAuthContainerBody));