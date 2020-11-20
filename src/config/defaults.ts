import crypto from 'crypto';

export const createNewProjectStateDefaults: any = {
    attributeTable: [
        {
            name: 'username',
            unique: false,
            required: true,
            default: '',
            type: 'Username',
            max: 250,
            min: 3
        },
        {
            name: 'email',
            unique: true,
            required: true,
            default: '',
            type: 'Email',
            max: 250,
            min: 3
        },
        {
            name: 'name',
            unique: false,
            required: false,
            default: 'John Doe',
            type: 'String',
            max: 250,
            min: 3
        },
        {
            name: 'password',
            unique: false,
            required: true,
            default: '',
            type: 'Password',
            max: 250,
            min: 3
        }
    ],
    authenticationSettings: {
        userSignUp: 0,
        appSecret: crypto.randomBytes(16).toString('hex'),
        sessionExpiresIn: {
            forever: false,
            days: 30,
            minutes: 0
        }
    },
    passwordConfig: {
        upperCase: true,
        lowerCase: true,
        requireNumbers: true,
        requireSpecialChars: true,
    },
    errors: [],
    OAuth: {
        google: {
            clientID: '',
            clientSecret: '',
            redirectURI: ''
        }
    }
}