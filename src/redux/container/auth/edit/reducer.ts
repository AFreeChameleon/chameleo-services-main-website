import {
    SET_CONTAINER,
    SET_NAME,
    SET_TIER,
    SET_CONTAINER_CONFIG_MODEL,
    SET_CONTAINER_CONFIG_MODEL_LENGTH,
    ADD_CONTAINER_CONFIG_MODEL_ROW,
    REMOVE_CONTAINER_CONFIG_MODEL_ROW,

    SET_CONTAINER_CONFIG_PASS,
    SET_CONTAINER_CONFIG_DB,
    SET_CONTAINER_CONFIG_MAIL
} from './types';

const defaultState: any = {
    name: '',
    tier: '',
    config: {},
    errors: []
}

const reducer = (state = defaultState, action) => {
    let newModel;
    switch (action.type) {
        case SET_CONTAINER:
            return {
                ...state,
                ...action.container
            }
        case SET_NAME:
            return {
                ...state,
                name: action.value
            }
        case SET_TIER:
            return {
                ...state,
                tier: action.value
            }
        case SET_CONTAINER_CONFIG_MODEL:
            newModel = [ ...state.config.model ];
            console.log(newModel[newModel.findIndex(row => row.name === action.rowName)])
            newModel[newModel.findIndex(row => row.name === action.rowName)][action.key] = action.value
            return {
                ...state,
                config: {
                    ...state.config,
                    model: [
                        ...newModel
                    ]
                }
            }
        case SET_CONTAINER_CONFIG_MODEL_LENGTH:
            newModel = [ ...state.config.model ];
            console.log(action.rowName)
            newModel[newModel.findIndex(row => row.name === action.rowName)].length[action.key] = action.value
            return {
                ...state,
                config: {
                    ...state.config,
                    model: [
                        ...newModel
                    ]
                }
            }
        case REMOVE_CONTAINER_CONFIG_MODEL_ROW:
            newModel = [ ...state.config.model ];
            console.log(newModel.filter(row => row.name !== action.rowName), action.rowName)
            return {
                ...state,
                config: {
                    ...state.config,
                    model: newModel.filter(row => row.name !== action.rowName)
                }
            }
        case ADD_CONTAINER_CONFIG_MODEL_ROW:
            return {
                ...state,
                config: {
                    ...state.config,
                    model: [
                        ...state.config.model,
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
        case SET_CONTAINER_CONFIG_AUTH:
            return {
                ...state,
                config: {
                    ...state.config,
                    auth: {
                        ...state.config.auth,
                        [action.key]: action.value
                    }
                }
            }
        case SET_CONTAINER_CONFIG_AUTH_OAUTH:
            return {
                ...state,
                config: {
                    ...state.config,
                    auth: {
                        ...state.config.auth,
                        oauth: {
                            ...state.config.auth.oauth,
                            [action.company]: {
                                ...state.config.auth.oauth[action.company],
                                [action.key]: action.value
                            }
                        }
                    }
                }
            }
        case TOGGLE_CONTAINER_CONFIG_AUTH_OAUTH:
            return {
                ...state,
                config: {
                    ...state.config,
                    auth: {
                        ...state.config.auth,
                        oauth: {
                            ...state.config.auth.oauth,
                            enabled: action.value
                        }
                    }
                }
            }
        case SET_CONTAINER_CONFIG_PASS:
            return {
                ...state,
                config: {
                    ...state.config,
                    pass: {
                        ...state.config.pass,
                        [action.key]: action.value
                    }
                }
            }
        case SET_CONTAINER_CONFIG_DB:
            return {
                ...state,
                config: {
                    ...state.config,
                    db: {
                        ...state.config.db,
                        [action.key]: action.value
                    }
                }
            }
        case SET_CONTAINER_CONFIG_MAIL:
            return {
                ...state,
                config: {
                    ...state.config,
                    mail: {
                        ...state.config.mail,
                        [action.key]: action.value
                    }
                }
            }
        default:
            return state;
    }
}

export default reducer;