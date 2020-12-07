import {
    FETCH_CONFIG_REQUEST,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE
} from './types';

const configState = {
    loading: false,
    config: {},
    error: ''
}

const configReducer = (state = configState, action) => {
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
        default:
            return state;
    }
}

export default configReducer;