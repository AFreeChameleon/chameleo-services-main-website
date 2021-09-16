const checkSingleVerifiableColumns = (model: any[]) => {
    const verifiableRows = model.filter((r) => r.attributes.includes('Verifiable'));
    const emailVerifiedRows = verifiableRows.filter((r) => r.attributes.includes('Email'));
    const phoneVerifiableRows = verifiableRows.filter((r) => r.attributes.includes('Phone number'));
    if (emailVerifiedRows.length > 1) {
        return {error: true, message: 'Can only have one row with the attributes: Email and Verifiable'};
    } else if (phoneVerifiableRows.length > 1) {
        return {error: true, message: 'Can only have one row with the attributes: Phone number and Verifiable'};
    } else {
        return {error: false};
    }
}

const checkPassword = (model: any[]) => {
    const passwordRows = model.filter((r) => r.attributes.includes('Password'));
    if (!passwordRows.length) {
        return {
            error: true,
            message: 'Must have one row with Password attribute'
        };
    } else if (passwordRows.length > 1) {
        return {
            error: true,
            message: 'Can only have one row with Password attribute'
        };
    } else {
        return {error: false};
    }
}

const checkUsername = (model: any[]) => {
    const usernameRows = model.filter((r) => r.attributes.includes('Username'));
    if(!usernameRows.length) {
        return {
            error: true,
            message: 'Must have at least one row with Username attribute'
        }
    } else {
        return {error: false}
    }
}

const checkEmailPhoneRows = (model: any[]) => {
    const invalidRows = model.filter((r) => r.attributes.includes('Email') && r.attributes.includes('Phone number'));
    if (invalidRows.length) {
        return {
            error: true,
            message: 'Can\'t have one row with both Email and Phone number attributes'
        }
    } else {
        return {error: false}
    }
}

export const checkConfig = (config: any) => {
    const verifiableCheck = checkSingleVerifiableColumns(config.model);
    if (verifiableCheck.error) {
        return verifiableCheck;
    }
    const passwordCheck = checkPassword(config.model);
    if (passwordCheck.error) {
        return passwordCheck;
    }
    const usernameCheck = checkUsername(config.model);
    if (usernameCheck.error) {
        return usernameCheck;
    }
    const phoneEmailCheck = checkEmailPhoneRows(config.model);
    if (phoneEmailCheck.error) {
        return phoneEmailCheck;
    }
    const mailValidated = checkMailConfig(config.mail);
    if (mailValidated.error) {
        return mailValidated;
    }
    const authValidated = checkAuthConfig(config.auth);
    if (authValidated.error) {
        return authValidated;
    }
    return {error: false};
}

export const checkMailConfig = (mail: any) => {
    if (mail.enabled) {
        if (!mail.fromAddress) {
            return {
                error: true,
                message: 'Missing from address.'
            }
        }
        if (!mail.verifySubject) {
            return {
                error: true,
                message: 'Missing verifification email subject.'
            }
        }
        if (!mail.verifyContent) {
            return {
                error: true,
                message: 'Missing verifification email content.'
            }
        }
        if (!mail.resetSubject) {
            return {
                error: true,
                message: 'Missing reset password email subject.'
            }
        }
        if (!mail.resetContent) {
            return {
                error: true,
                message: 'Missing reset password email content.'
            }
        }
    } else {
        return {
            error: false
        }
    }
}

export const checkAuthConfig = (auth: any) => {
    const { oauth } = auth;
    if (oauth.enabled) {
        if (!(oauth.google.clientID && oauth.google.clientSecret && oauth.google.redirectURI)) {
            if (!oauth.google.clientID) {
                return {
                    error: true,
                    message: 'Missing Google client ID.'
                }
            }
            if (!oauth.google.clientSecret) {
                return {
                    error: true,
                    message: 'Missing Google client secret.'
                }
            }
            if (!oauth.google.redirectURI) {
                return {
                    error: true,
                    message: 'Missing Google redirect URI.'
                }
            }
        }
    }
    if (!auth.sessionExpiresIn.forever) {
        if ((auth.sessionExpiresIn.days + auth.sessionExpiresIn.hours) <= 0) {
            return {
                error: true,
                message: 'Session length must have a time.'
            }
        }
    }
    return {
        error: false
    }
}