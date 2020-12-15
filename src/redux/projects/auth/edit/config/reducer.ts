import {
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
    CHANGE_CONFIG_MODEL_TITLE
} from './types';

const configState: any = {
    loading: false,
    data: {
        auth: {},
        db: {},
        model: [],
        pass: {}
    },
    error: ''
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
                error: ''
            }
        case FETCH_CONFIG_FAILURE:
            return {
                loading: false,
                error: action.error
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