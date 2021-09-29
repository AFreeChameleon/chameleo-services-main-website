import {
    SET_CONFIG_ERRORS,
    FETCH_CONFIG_REQUEST,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE,

    CHANGE_CONFIG_MODEL,
    CHANGE_CONFIG_AUTH,
    CHANGE_CONFIG_AUTH_OAUTH,
    CHANGE_CONFIG_DB,
    CHANGE_CONFIG_PASS,
    CHANGE_CONFIG_MAIL,

    CHANGE_CONFIG_MODEL_LENGTH,
    REMOVE_CONFIG_MODEL_ROW,
    ADD_CONFIG_MODEL_ROW,
    CHANGE_CONFIG_MODEL_TITLE,
    TOGGLE_CONFIG_AUTH_OAUTH
} from './types';

const configState: any = {
    loading: false,
    errors: [],
    data: {
        auth: {
            emailColumnName: 'email',
            usernameColumnName: 'username',
            userSignUp: true,
            oauth: {
                enabled: true,
                google: {
                    clientID: '',
                    clientSecret: '',
                    redirectURI: ''
                }
            },
            sessionExpiresIn: {
                forever: false,
                days: 30,
                minutes: 0
            }
        },
        db: {
            host: 'localhost',
            name: 'chameleo-services-auth'
        },
        model: [
            {
                name: 'username',
                unique: false,
                allowNull: false,
                default: '',
                type: 'Username',
                length: {
                    max: 250,
                    min: 3
                }
            },
            {
                name: 'email',
                unique: true,
                allowNull: false,
                default: '',
                type: 'Email',
                length: {
                    max: 250,
                    min: 3
                }
            },
            {
                name: 'name',
                unique: false,
                allowNull: true,
                default: 'John Doe',
                type: 'String',
                length: {
                    max: 250,
                    min: 3
                }
            },
            {
                name: 'password',
                unique: false,
                allowNull: false,
                default: '',
                type: 'Password',
                length: {
                    max: 250,
                    min: 3
                }
            }
        ],
        mail: {
            enabled: true,
            fromAddress: '',
            verificationType: 'link',
        
            verifySubject: 'Verify your email!',
            verifyContent: 'Verify your email by clicking this link: {__verify__}',
        
            resetSubject: 'Your password has been reset!',
            resetContent: 'Your password has been reset to: {__password__}'
        },
        pass: {
            lowercase: true,
            uppercase: true,
            requireNumbers: true,
            requireSpecialChars: true
        },
    }
}

const configReducer = (state = configState, action) => {
    // Just for copying the state obj rather than editing it directly
    let newModel;
    switch (action.type) {
        case FETCH_CONFIG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.config,
                errors: []
            }
        case FETCH_CONFIG_FAILURE:
            return {
                ...state,
                loading: false,
                errors: [action.error]
            }
        case SET_CONFIG_ERRORS:
            return {
                ...state,
                errors: [ ...action.errors ]
            }
        case CHANGE_CONFIG_MODEL:
            newModel = [ ...state.data.model ];
            console.log(newModel[newModel.findIndex(row => row.name === action.rowName)])
            newModel[newModel.findIndex(row => row.name === action.rowName)][action.key] = action.value
            return {
                ...state,
                data: {
                    ...state.data,
                    model: [
                        ...newModel
                    ]
                }
            }
        case CHANGE_CONFIG_MODEL_LENGTH:
            newModel = [ ...state.data.model ];
            console.log(action.rowName)
            newModel[newModel.findIndex(row => row.name === action.rowName)].length[action.key] = action.value
            return {
                ...state,
                data: {
                    ...state.data,
                    model: [
                        ...newModel
                    ]
                }
            }
        case CHANGE_CONFIG_AUTH:
            return {
                ...state,
                data: {
                    ...state.data,
                    auth: {
                        ...state.data.auth,
                        [action.key]: action.value
                    }
                }
            }
        case CHANGE_CONFIG_AUTH_OAUTH:
            return {
                ...state,
                data: {
                    ...state.data,
                    auth: {
                        ...state.data.auth,
                        oauth: {
                            ...state.data.auth.oauth,
                            [action.company]: {
                                ...state.data.auth.oauth[action.company],
                                [action.key]: action.value
                            }
                        }
                    }
                }
            }
        case TOGGLE_CONFIG_AUTH_OAUTH:
            return {
                ...state,
                data: {
                    ...state.data,
                    auth: {
                        ...state.data.auth,
                        oauth: {
                            ...state.data.auth.oauth,
                            enabled: action.value
                        }
                    }
                }
            }
        case CHANGE_CONFIG_PASS:
            return {
                ...state,
                data: {
                    ...state.data,
                    pass: {
                        ...state.data.pass,
                        [action.key]: action.value
                    }
                }
            }
        case CHANGE_CONFIG_DB:
            return {
                ...state,
                data: {
                    ...state.data,
                    db: {
                        ...state.data.db,
                        [action.key]: action.value
                    }
                }
            }
        case CHANGE_CONFIG_MAIL:
            return {
                ...state,
                data: {
                    ...state.data,
                    mail: {
                        ...state.data.mail,
                        [action.key]: action.value
                    }
                }
            }
        case REMOVE_CONFIG_MODEL_ROW:
            newModel = [ ...state.data.model ];
            console.log(newModel.filter(row => row.name !== action.rowName), action.rowName)
            return {
                ...state,
                data: {
                    ...state.data,
                    model: newModel.filter(row => row.name !== action.rowName)
                }
            }
        case ADD_CONFIG_MODEL_ROW:
            return {
                ...state,
                data: {
                    ...state.data,
                    model: [
                        ...state.data.model,
                        {
                            name: 'columnName',
                            allowNull: true,
                            length: {min: 3, max: 250},
                            type: 'String',
                            unique: false
                        }
                    ]
                }
            }
        case CHANGE_CONFIG_MODEL_TITLE:
            newModel = { ...state.data.model };
            if (!newModel[action.newName]) {
                newModel[action.newName] = newModel[action.oldName];
                delete newModel[action.oldName];
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    model: { 
                        ...newModel
                    }
                }
            }
        default:
            return state;
    }
}

export default configReducer;