import React from 'react';
import NextLink from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { MAIN_URL } from '../../../globals';
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
} from '../../../redux/container/auth/config/actions';
import {
    setContainerName,
    setContainerConfigModel,
    setContainerConfigModelLength
} from '../../../redux/container/auth/edit/actions';
import { 
    Breadcrumbs, 
    Select, 
    MenuItem, 
    Button, 
    RadioGroup, 
    Collapse,
    Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    StyledFormControlLabel,
    StyledCheckbox,
    StyledSelect,
    StyledTextField,
    StyledRadio,
    NumberInputNoTicks,
    GreenButton,
    RedButton
} from '../../Inputs';
import theme from '../../../styles/Theme';

type NewAuthContainerBodyProps = {
    classes?: any;
    container: { [key: string]: any };
    container_errors: string[];
    router: NextRouter;
    dispatchSetContainerName: (value: string) => null;
    dispatchSetContainerConfigModel: (rowNam: string, key: string, value: any) => null;
    dispatchSetContainerConfigModelLength: (rowName: string, key: string, value: any) => null;
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
    selectedOAuthCompany: 'Google';
    containerName: string;
}

class NewAuthContainerBody extends React.Component<NewAuthContainerBodyProps, NewAuthContainerBodyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOAuthCompany: 'Google',
            containerName: 'New Container'
        }
        this.submitCreateContainer = this.submitCreateContainer.bind(this);
    }

    // ! CHANGE
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


    // ! CHANGE
    submitCreateContainer(e) {
        const { container, router, dispatchSetConfigErrors } = this.props;
        const { containerName } = this.state;
        const errors = this.checkErrorsExist(config);
        console.log(`${MAIN_URL}/api/containers/auth/new`)
        if (errors.length > 0) {
            dispatchSetConfigErrors(errors);
            document.getElementById('top').scrollIntoView({ behavior: 'smooth' })
        } else {
            // Do stuff
            console.log('No errors', config);
            axios.post(`${MAIN_URL}/api/containers/auth/edit`, {
                config: config,
                name: containerName
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

    // ! CHANGE
    render() {
        const { 
            classes, 
            container, 
            container_errors,
            dispatchSetContainerName,
            dispatchSetContainerConfigModel,
            dispatchSetContainerConfigModelLength,
            
            dispatchRemoveConfigModelRow, 
            dispatchAddConfigModelRow,
            dispatchChangeConfigPass,
            dispatchChangeConfigAuth,
            dispatchChangeConfigMail,
            dispatchChangeConfigAuthOAuth,
            dispatchSetConfigOAuthEnabled
        } = this.props;
        const { selectedOAuthCompany, containerName } = this.state;
        console.log(container, container_errors)

        return (
            <div className={classes.root}>
                <Snackbar open={container_errors.length > 0} autoHideDuration={6000}>
                    <div>
                        { container_errors.map((error, i) => (
                            <Alert variant="filled" severity="error" className={classes.errorAlert} key={i}>
                                {error}
                            </Alert> 
                        )) }
                    </div>
                </Snackbar>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" htmlColor="#6F6F76" />} id="top">
                    <NextLink href="/dashboard">
                        <div className={classes.breadcrumb}>Dashboard</div>
                    </NextLink>
                    <NextLink href="/dashboard/auth">
                        <div className={classes.breadcrumb}>Auth</div>
                    </NextLink>
                    <div className={classes.breadcrumbMain}>Edit Container</div>
                </Breadcrumbs>
                <div className={classes.container}>
                    <div className={classes.title}>Container Details</div>
                    <div className={classes.containerName}>
                        <StyledTextField
                            fullWidth
                            label="Container Name"
                            placeholder="Container Name"
                            color="secondary"
                            value={container.name}
                            onChange={(e) => {
                                dispatchSetContainerName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>
                        Table Columns
                    </div>
                    <div className={classes.tableContainer}>
                        <div className={classes.tableTooltip}>Click on any value to edit it</div>
                        <div className={classes.tableHeaders}>
                            <div className={classes.tableHeader}>
                                Name
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Unique
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Required
                            </div>
                            <div className={classes.tableHeader}>
                                Default
                            </div>
                            <div className={classes.tableHeader}>
                                Type
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Max. Length
                            </div>
                            <div className={`${classes.tableHeader} ${classes.center}`}>
                                Min. Length
                            </div>
                        </div>
                        <div className={classes.tableBody}>
                            { container.config.model.map((row, i) => (
                                <div className={classes.tableRow} key={i}>
                                    <div className={classes.tableColumn}>
                                        <input
                                            className={classes.invisibleInput}
                                            value={row.name}
                                            onChange={(e) => 
                                                dispatchSetContainerConfigModel(row.name, 'name', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={`${classes.tableColumn} ${classes.center}`}>
                                        <StyledCheckbox
                                            checked={row.unique}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModel(row.name, 'unique', e.target.checked)
                                            }}
                                        />
                                    </div>
                                    <div className={`${classes.tableColumn} ${classes.center}`}>
                                        <StyledCheckbox
                                            checked={!row.allowNull}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModel(row.name, 'allowNull', !e.target.checked)
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={row.defaultValue ? row.defaultValue : ''}
                                            disabled={!row.allowNull}
                                            className={classes.invisibleInput}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModel(row.name, 'defaultValue', e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <Select
                                            variant="outlined"
                                            value={row.type}
                                            fullWidth
                                            input={<StyledSelect/>}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModel(row.name, 'type', e.target.value)
                                            }}
                                        >
                                            <MenuItem value="String" className={classes.menuItem}>String</MenuItem>
                                            <MenuItem value="Number" className={classes.menuItem}>Number</MenuItem>
                                            <MenuItem value="Username" className={classes.menuItem}>Username</MenuItem>
                                            <MenuItem value="Email" className={classes.menuItem}>Email</MenuItem>
                                            <MenuItem value="Password" className={classes.menuItem}>Password</MenuItem>
                                        </Select>
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={
                                                row.length && 
                                                    (!isNaN(row.length.min) ?
                                                    row.length.min : 
                                                    ''
                                            )}
                                            className={`${classes.invisibleInput} ${classes.center}`}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModelLength(row.name, 'min', parseInt(e.target.value))
                                            }}
                                        />
                                    </div>
                                    <div className={classes.tableColumn}>
                                        <input
                                            value={
                                                row.length && 
                                                    (!isNaN(row.length.max) ? 
                                                    row.length.max : 
                                                    ''
                                            )}
                                            className={`${classes.invisibleInput} ${classes.center}`}
                                            onChange={(e) => {
                                                dispatchSetContainerConfigModelLength(row.name, 'max', parseInt(e.target.value))
                                            }}
                                        />
                                    </div>
                                    <div className={`${classes.modelColumn} ${classes.center}`}>
                                        <RedButton
                                            onClick={(e) => {
                                                dispatchRemoveConfigModelRow(row.name);
                                            }}
                                        >
                                            <RemoveIcon/>
                                        </RedButton>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className={classes.addModelRowButton}>
                        <GreenButton
                            color="secondary"
                            variant="outlined"
                            onClick={(e) => {
                                dispatchAddConfigModelRow();
                            }}
                            endIcon={<AddIcon/>}
                        >
                            Add New Row
                        </GreenButton>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>Password Settings</div>
                    <div className={classes.passwordCheckboxContainer}>
                        <div className={classes.passwordCheckbox}>
                            <StyledFormControlLabel
                                control={
                                    <StyledCheckbox 
                                        checked={container.config.pass.uppercase} 
                                        onChange={(e) => {
                                            dispatchChangeConfigPass('uppercase', e.target.checked);
                                        }} 
                                    />
                                }
                                label="Uppercase letters"
                            />
                        </div>
                        <div className={classes.passwordCheckbox}>
                            <StyledFormControlLabel
                                control={
                                    <StyledCheckbox 
                                        checked={container.config.pass.lowercase} 
                                        onChange={(e) => {
                                            dispatchChangeConfigPass('lowercase', e.target.checked);
                                        }} 
                                    />
                                }
                                label="Lowercase letters"
                            />
                        </div>
                        <div className={classes.passwordCheckbox}>
                            <StyledFormControlLabel
                                control={
                                    <StyledCheckbox 
                                        checked={container.config.pass.requireNumbers} 
                                        onChange={(e) => {
                                            dispatchChangeConfigPass('requireNumbers', e.target.checked);
                                        }} 
                                    />
                                }
                                label="Require numbers"
                            />
                        </div>
                        <div className={classes.passwordCheckbox}>
                            <StyledFormControlLabel
                                control={
                                    <StyledCheckbox 
                                        checked={container.config.pass.requireSpecialChars} 
                                        onChange={(e) => {
                                            dispatchChangeConfigPass('requireSpecialChars', e.target.checked);
                                        }} 
                                    />
                                }
                                label="Require special characters"
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>Session Settings</div>
                    <RadioGroup
                        className={classes.sessionRadioButtons}
                        value={container.config.auth.userSignUp}
                        onChange={(e) => {
                            dispatchChangeConfigAuth('userSignUp', (e.target.value === 'true'))
                        }}
                    >
                        <StyledFormControlLabel
                            value={true}
                            label="Allow users to register"
                            control={<StyledRadio color="secondary"/>}
                            className={classes.passwordCheckbox}
                        />
                        <StyledFormControlLabel
                            value={false}
                            label="Only allow administrators to make an account"
                            control={<StyledRadio color="secondary"/>}
                            className={classes.passwordCheckbox}
                        />
                    </RadioGroup>
                    <div className={classes.sessionExpiresInContainer}>
                        <div className={classes.subtitle}>Session expires in</div>
                        <div className={classes.sessionExpiresInCheckbox}>
                            <StyledFormControlLabel
                                label="Never"
                                className={classes.passwordCheckbox}
                                control={<StyledCheckbox
                                    checked={container.config.auth.sessionExpiresIn && container.config.auth.sessionExpiresIn.forever}
                                    onChange={(e) => {
                                        dispatchChangeConfigAuth('sessionExpiresIn', {
                                            ...container.config.auth.sessionExpiresIn,
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
                                    color="secondary"
                                    type="number"
                                    value={container.config.auth.sessionExpiresIn && container.config.auth.sessionExpiresIn.days}
                                    disabled={container.config.auth.sessionExpiresIn && container.config.auth.sessionExpiresIn.forever}
                                    fullWidth
                                    onChange={(e) => {
                                        dispatchChangeConfigAuth('sessionExpiresIn', {
                                            ...container.config.auth.sessionExpiresIn,
                                            days: parseInt(e.target.value)
                                        });
                                    }}
                                />
                            </div>
                            <div className={classes.sessionExpiresInColumn}>
                                <NumberInputNoTicks
                                    className={classes.listItemColumnFull}
                                    label="Hours"
                                    color="secondary"
                                    type="number"
                                    value={container.config.auth.sessionExpiresIn && container.config.auth.sessionExpiresIn.hours}
                                    disabled={container.config.auth.sessionExpiresIn && container.config.auth.sessionExpiresIn.forever}
                                    fullWidth
                                    onChange={(e) => {
                                        dispatchChangeConfigAuth('sessionExpiresIn', {
                                            ...container.config.auth.sessionExpiresIn,
                                            hours: parseInt(e.target.value)
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>Mail Configuration</div>
                    <div className={classes.enableEmailing}>
                        <StyledFormControlLabel
                            className={classes.passwordCheckbox}
                            control={
                                <StyledCheckbox 
                                    checked={!container.config.mail.enabled} 
                                    onChange={(e) => {
                                        dispatchChangeConfigMail('enabled', !e.target.checked);
                                    }} 
                                />
                            }
                            label="Disable emailing."
                        />
                    </div>
                    <Collapse
                        in={container.config.mail.enabled}
                    >
                        <div className={classes.fromAddress}>
                            <StyledTextField
                                fullWidth
                                label="From address"
                                placeholder="e.g john.doe@company.co"
                                color="secondary"
                                disabled={!container.config.mail.enabled}
                                value={container.config.mail.fromAddress}
                                onChange={(e) => {
                                    dispatchChangeConfigMail('fromAddress', e.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.subtitle}>
                            Verification type
                        </div>
                        <RadioGroup
                            className={classes.verificationRadioButtons}
                            value={container.config.mail.verificationType}
                            onChange={(e) => {
                                dispatchChangeConfigMail('verificationType', e.target.value);
                            }}
                        >
                            <StyledFormControlLabel
                                disabled={!container.config.mail.enabled}
                                value="link"
                                label="Link"
                                control={<StyledRadio color="secondary"/>}
                                className={classes.passwordCheckbox}
                            />
                            <StyledFormControlLabel
                                disabled={!container.config.mail.enabled}
                                value="code"
                                label="Code"
                                control={<StyledRadio color="secondary"/>}
                                className={classes.passwordCheckbox}
                            />
                        </RadioGroup>
                        <div className={classes.subtitle}>
                            Account verification email
                        </div>
                        <div className={classes.emailSubject}>
                            <StyledTextField
                                fullWidth
                                label="Email subject"
                                placeholder="Verify your account!"
                                color="secondary"
                                disabled={!container.config.mail.enabled}
                                value={container.config.mail.verifySubject}
                                onChange={(e) => {
                                    dispatchChangeConfigMail('verifySubject', e.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.emailHTML}>
                            <StyledTextField
                                fullWidth
                                multiline
                                rowsMax={4}
                                label="Email HTML"
                                color="secondary"
                                disabled={!container.config.mail.enabled}
                                value={container.config.mail.verifyContent}
                                onChange={(e) => {
                                    dispatchChangeConfigMail('verifyContent', e.target.value);
                                }}
                                helperText="{__verify__} will be replaced with the link or code depending on which you choose."
                            />
                        </div>
                        <div className={classes.subtitle}>
                            Reset password email
                        </div>
                        <div className={classes.emailSubject}>
                            <StyledTextField
                                fullWidth
                                label="Email subject"
                                placeholder="Reset your password!"
                                color="secondary"
                                disabled={!container.config.mail.enabled}
                                value={container.config.mail.resetSubject}
                                onChange={(e) => {
                                    dispatchChangeConfigMail('resetSubject', e.target.value);
                                }}
                            />
                        </div>
                        <div className={classes.emailHTML}>
                            <StyledTextField
                                fullWidth
                                multiline
                                rowsMax={4}
                                label="Email HTML"
                                color="secondary"
                                disabled={!container.config.mail.enabled}
                                value={container.config.mail.resetContent}
                                onChange={(e) => {
                                    dispatchChangeConfigMail('resetContent', e.target.value);
                                }}
                                helperText="{__temporary password__} will be replaced with the temporary password."
                            />
                        </div>
                    </Collapse>
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>OAuth</div>
                    <div>
                        <StyledFormControlLabel
                            className={classes.passwordCheckbox}
                            control={
                                <StyledCheckbox 
                                    checked={!container.config.auth.oauth.enabled} 
                                    onChange={(e) => {
                                        dispatchSetConfigOAuthEnabled(!e.target.checked);
                                    }} 
                                />
                            }
                            label="Disable oauth."
                        />
                    </div>
                    <Collapse in={container.config.auth.oauth.enabled}>
                        <div className={classes.oauthGrid}>
                            <div className={classes.oauthList}>
                                <div className={`${classes.oauthItem} ${selectedOAuthCompany === 'Google' && classes.oauthItemSelected}`}>
                                    Google
                                </div>
                            </div>
                            <div className={classes.oauthForm}>
                                <div className={classes.subtitle}>Google Setup</div>
                                <div className={classes.oauthInput}>
                                    <StyledTextField
                                        fullWidth
                                        label="Client ID"
                                        color="secondary"
                                        value={container.config.auth.oauth.google.clientID}
                                        onChange={(e) => {
                                            dispatchChangeConfigAuthOAuth('google', 'clientID', e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={classes.oauthInput}>
                                    <StyledTextField
                                        fullWidth
                                        label="Client Secret"
                                        color="secondary"
                                        value={container.config.auth.oauth.google.clientSecret}
                                        onChange={(e) => {
                                            dispatchChangeConfigAuthOAuth('google', 'clientSecret', e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={classes.oauthInput}>
                                    <StyledTextField
                                        fullWidth
                                        label="Redirect URI"
                                        color="secondary"
                                        value={container.config.auth.oauth.google.redirectURI}
                                        onChange={(e) => {
                                            dispatchChangeConfigAuthOAuth('google', 'redirectURI', e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className={classes.submitButton}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.submitCreateContainer}
                    >
                        Create Container
                    </Button>
                </div>
            </div>
        )
    }
}

const styles = (): any => ({
    root: {
        backgroundColor: '#212121',
        overflowY: 'auto',
        padding: '10px 15px',
        color: '#ffffff',
        '&::-webkit-scrollbar': {
            width: '8px',
            marginRight: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6F6F76',
            borderRadius: '5px'
        }
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
    container: {
        maxWidth: '1100px',
        backgroundColor: '#2C2C2C',
        marginTop: '10px',
        borderRadius: '10px',
        padding: '10px'
    },
    title: {
        fontSize: '16px',
        fontWeight: 500
    },

    tableContainer: {
        marginTop: '10px'
    },
    tableHeaders: {
        display: 'grid',
        gridTemplateColumns: '26% 6% 8% 15% 15% 11% 11% 8%',
        width: '100%',
        height: '40px',
        backgroundColor: '#51C85D',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '0 5px'
    },
    tableHeader: {
        padding: '0 5px',
    },
    tableBody: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        paddingTop: '5px'
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '26% 6% 8% 15% 15% 11% 11% 8%',
        width: '100%',
        height: '40px',
        alignItems: 'center',
        borderRadius: '5px',
        
    },
    tableColumn: {
        padding: '0 5px',
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
        color: '#ffffff',
        '&:disabled': {
            backgroundColor: 'rgb(0, 0, 0, 0.1)'
        }
    },
    menuItem: {
    },
    addModelRowButton: {
        padding: '10px 0 0 10px'
    },
    passwordCheckboxContainer: {
        paddingTop: '5px'
    },
    passwordCheckbox: {
        paddingLeft: '10px',
        paddingTop: '2px'
    },
    sessionExpiresInContainer: {
        paddingTop: '10px'
    },
    sessionRadioButtons: {
        paddingTop: '5px'
    },
    sessionExpiresInTime: {
        display: 'flex',
        columnGap: '10px',
        paddingLeft: '5px',
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
        paddingLeft: '5px',
        paddingBottom: '20px'
    },
    verificationRadioButtons: {
        paddingBottom: '10px'
    },
    emailSubject: {
        width: '415px',
        paddingLeft: '5px',
        paddingBottom: '20px',
        paddingTop: '10px'
    },
    emailHTML: {
        paddingLeft: '5px',
        paddingBottom: '20px'
    },
    subtitle: {
        // paddingBottom: '10px'
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
        maxWidth: '1100px',
        marginTop: '10px',
        borderRadius: '10px',
    },
    containerName: {
        width: '415px',
        padding: '10px 0px 0px 10px'
    }
});

const mapStateToProps = (state) => ({
    container: state.container.auth.edit,
    container_errors: state.container.auth.edit.errors
});

const mapDispatchToProps = (dispatch) => ({
    dispatchSetContainerName: (value: string) => dispatch(setContainerName(value)),
    dispatchSetContainerConfigModel: (rowName: string, key: string, value: any) => dispatch(setContainerConfigModel(rowName, key, value)),
    dispatchSetContainerConfigModelLength: (rowName: string, key: string, value: any) => dispatch(setContainerConfigModelLength(rowName, key, value)),
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
    withStyles(styles), 
)(withRouter(NewAuthContainerBody));