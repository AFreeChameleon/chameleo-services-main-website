import {
    FETCH_CONFIG_REQUEST,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE,

    CHANGE_CONFIG_MODEL,
    CHANGE_CONFIG_AUTH,
    CHANGE_CONFIG_DB,
    CHANGE_CONFIG_PASS,
    CHANGE_CONFIG_MODEL_LENGTH,
    REMOVE_CONFIG_MODEL_ROW,
    CHANGE_CONFIG_MODEL_TITLE
} from './types';

const configState: any = {
    loading: false,
    config: {
        auth: {},
        db: {},
        model: {},
        pass: {}
    },
    error: ''
}

const configReducer = (state = configState, action) => {
    // Just for copying the state obj rather than editing it directly
    let newModel = {};
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
                config: action.config,
                error: ''
            }
        case FETCH_CONFIG_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        case CHANGE_CONFIG_MODEL:
            return {
                ...state,
                config: {
                    ...state.config,
                    model: {
                        ...state.config.model,
                        [action.rowName]: {
                            ...state.config.model[action.rowName],
                            [action.key]: action.value
                        }
                    }
                }
            }
        case CHANGE_CONFIG_MODEL_LENGTH:
            const len = action.key === 'min' ? 
                [ action.value, state.config.model[action.modelKey].validate.len.args[0][1] ] :
                [ state.config.model[action.modelKey].validate.len.args[0][0], action.value ]

            return {
                ...state,
                config: {
                    ...state.config,
                    model: {
                        ...state.config.model,
                        [action.modelKey]: {
                            ...state.config.model[action.modelKey],
                            validate: {
                                ...state.config.model[action.modelKey].validate,
                                len: {
                                    ...state.config.model[action.modelKey].validate.len,
                                    args: [ len ]
                                }
                            }
                        }
                    }
                }
            }
        case CHANGE_CONFIG_AUTH:
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
        case CHANGE_CONFIG_PASS:
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
        case CHANGE_CONFIG_DB:
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
        case REMOVE_CONFIG_MODEL_ROW:
            newModel = {};
            for (const key of Object.keys(state.config.model)) {
                if (key !== action.rowName) {
                    newModel[key] = state.config.model[key];
                }
            }
            return {
                ...state,
                config: {
                    ...state.config,
                    model: { 
                        ...newModel
                    }
                }
            }
        case CHANGE_CONFIG_MODEL_TITLE:
            newModel = { ...state.config.model };
            if (!newModel[action.newName]) {
                newModel[action.newName] = newModel[action.oldName];
                delete newModel[action.oldName];
            }
            return {
                ...state,
                config: {
                    ...state.config,
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