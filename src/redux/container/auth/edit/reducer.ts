import {
    SET_NAME,
    SET_TIER,
    SET_CONTAINER
} from './types';

const defaultState = {
    name: '',
    tier: '',
    config: {},
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CONTAINER:
            return {
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
        default:
            return state;
    }
}

export default reducer;