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
    Tab as MuiTab,
    Input,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
    StyledFormControlLabel,
    StyledCheckbox,
    StyledSelect,
    StyledTextField,
    StyledRadio,
    NumberInputNoTicks,
    GreenButton,
    RedButton
} from '../../../Inputs';
import TabPanel from '../../../TabPanel';

const Tab = withStyles((theme) => ({
    selected: {
    }
}))(MuiTab)

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
}

type NewAuthContainerBodyState = {
    selectedOAuthCompany: number;
    containerName: string;
    configTab: number;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps, NewAuthContainerBodyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOAuthCompany: 0,
            containerName: 'New Container',
            configTab: 0
        }
        this.submitCreateContainer = this.submitCreateContainer.bind(this);
    }

    checkErrorsExist(config: any) {
        const { model, mail } = config;
        const errors = [];
        const modelEmailRows = model.filter((row) => row.type === 'Email');
        const modelPasswordRows = model.filter((row) => row.type === 'Password');
        if (modelEmailRows.length === 0) {
            errors.push('Model: missing row with type: Email.');
        } else {
            if (modelEmailRows.length > 1)
                errors.push('Model: Only one row can have the Email type.');
            if (!modelEmailRows[0].unique === true)
                errors.push('Model: Email row needs to be unique.');
            if (modelEmailRows[0].allowNull)
                errors.push('Model: Email row needs to be required.');
        }
        if (modelPasswordRows.length === 0) {
            errors.push('Model: missing row with type: Password.');
        } else {
            if (modelPasswordRows.length > 1)
                errors.push('Model: Only one row can have the Password type.');
            if (modelPasswordRows[0].allowNull)
                errors.push('Model: Password row needs to be required.');
        }
        if (mail.enabled) {
            if (mail.fromAddress)
                errors.push('Mail: From address missing.');
            if (!mail.verifyContent.includes('{__verify__}'))
                errors.push('Mail: {__verify__} is missing in email content');
            if (!mail.resetContent.includes('{__temporary password__}'))
                errors.push('Mail: {__temporary password__} is missing in email content');
        }
        return errors;
    }

    submitCreateContainer(e) {
        const { config, router, dispatchSetConfigErrors } = this.props;
        const { containerName } = this.state;
        const errors = this.checkErrorsExist(config);
        if (errors.length > 0) {
            dispatchSetConfigErrors(errors);
            document.getElementById('top').scrollIntoView({ behavior: 'smooth' })
        } else {
            // Do stuff
            console.log('No errors', config);
            axios.post(`/api/container/new`, {
                config: config,
                name: containerName,
                type: 'auth'
            }, { withCredentials: true })
            .then((res: AxiosResponse) => {
                dispatchSetConfigErrors([]);
                console.log(res.data.message);
                router.push(`/dashboard`);
            })
            .catch((err: AxiosError) => {
                dispatchSetConfigErrors([err.response.data.message]);
            })
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
            dispatchSetConfigOAuthEnabled
        } = this.props;
        const { selectedOAuthCompany, containerName, configTab } = this.state;
        console.log(config.auth.oauth)
        return (
            <div className={classes.root}>
                <Snackbar open={config_errors.length > 0} autoHideDuration={6000}>
                    <div>
                        { config_errors.map((error, i) => (
                            <Alert variant="filled" severity="error" className={classes.errorAlert} key={i}>
                                {error}
                            </Alert> 
                        )) }
                    </div>
                </Snackbar>
                <div className={classes.tabsContainer}>
                    <Tabs 
                        indicatorColor="primary"
                        value={configTab} 
                        onChange={(e, newValue) => this.setState({
                            configTab: newValue
                        })}
                    >
                        <Tab label="User Model" />
                        <Tab label="Registration" />
                        <Tab label="Mail" />
                        <Tab label="OAuth" />
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
                                                    <MenuItem value="Required" className={classes.menuItem}>
                                                        <Checkbox checked={row.attributes.includes('Required')} color="primary" />
                                                        Required
                                                    </MenuItem>
                                                </Select>
                                            </div>
                                            <div className={classes.tableColumn}>
                                                { row.attributes.includes('Required') ? (
                                                    <Tooltip title={"Can't be edited if the row is required."}>
                                                        <TextField
                                                            disabled
                                                            value={row.default}
                                                            className={classes.invisibleInput}
                                                            onChange={(e) => {
                                                                dispatchChangeConfigModel(row.name, 'default', e.target.value)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <TextField
                                                        value={row.default}
                                                        className={classes.invisibleInput}
                                                        onChange={(e) => {
                                                            dispatchChangeConfigModel(row.name, 'default', e.target.value)
                                                        }}
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
                                            </div>
                                            <div className={classes.tableColumn}>
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
                            <div className={classes.subtitle}>Registration policies</div>
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
                                <div className={classes.subtitle}>Session expires in</div>
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
                            <div>
                                <FormControlLabel 
                                    label="Disable Mailing"
                                    className={classes.passwordCheckbox}
                                    control={<Checkbox
                                        color="primary"
                                        checked={!config.mail.enabled}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('enabled', !e.target.checked);
                                        }}
                                    />}
                                />
                            </div>
                            <Collapse in={config.mail.enabled}>
                                <div className={classes.fromAddress}>
                                    <TextField
                                        fullWidth
                                        placeholder="From address e.g john.doe@company.com"
                                        color="primary"
                                        disabled={!config.mail.enabled}
                                        value={config.mail.fromAddress}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('fromAddress', e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={classes.emailSubject}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        Account verification email
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Email subject"
                                        color="primary"
                                        disabled={!config.mail.enabled}
                                        value={config.mail.verifySubject}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('verifySubject', e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={classes.emailHTML}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        maxRows={10}
                                        placeholder="Email HTML"
                                        color="primary"
                                        disabled={!config.mail.enabled}
                                        value={config.mail.verifyContent}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('verifyContent', e.target.value);
                                        }}
                                        helperText="{__verify__} will be replaced with the link or code depending on which you choose."
                                    />
                                </div>
                                <div className={classes.emailSubject}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        Reset password email
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Email subject"
                                        color="primary"
                                        disabled={!config.mail.enabled}
                                        value={config.mail.resetSubject}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('resetSubject', e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={classes.emailHTML}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        maxRows={10}
                                        placeholder="Email HTML"
                                        color="primary"
                                        disabled={!config.mail.enabled}
                                        value={config.mail.resetContent}
                                        onChange={(e) => {
                                            dispatchChangeConfigMail('resetContent', e.target.value);
                                        }}
                                        helperText="{__temporary password__} will be replaced with the temporary password."
                                    />
                                </div>
                            </Collapse>
                            <div className={classes.nextButton}>
                                <GreenButton
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => {
                                        this.setState({ configTab: 3 })
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
                            <div>
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
                            </div>
                            <Collapse in={config.auth.oauth.enabled}>
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
                                            <Tab label="Twitter" />
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
                            </Collapse>
                            <div className={classes.submitButton}>
                                <Button
                                    // fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => changeSelectedPage(1)}
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
    config_errors: state.container.auth.config.errors
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
    dispatchSetConfigOAuthEnabled: (enabled: boolean) => dispatch(setConfigOAuthEnabled(enabled))
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
            paddingTop: '10px'
        },
        verificationRadioButtons: {
            paddingBottom: '10px'
        },
        emailSubject: {
            width: '415px',
            paddingTop: '20px'
        },
        emailHTML: {
            paddingTop: '10px'
        },
        subtitle: {
            paddingTop: '10px',
            fontWeight: 500
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
        },
        containerName: {
            width: '415px',
            padding: '10px 0px 0px 10px'
        },
        nextButton: {
            paddingTop: '20px'
        }
    })), 
)(withRouter(NewAuthContainerBody));