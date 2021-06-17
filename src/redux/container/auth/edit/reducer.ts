import {
    SET_CONTAINER,
    SET_NAME,
    SET_TIER,
    SET_CONTAINER_CONFIG_MODEL
} from './types';

const defaultState = {
    name: '',
    tier: '',
    config: {},
    errors: []
}

const reducer = (state = defaultState, action) => {
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
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;