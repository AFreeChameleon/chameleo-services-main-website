import {
    PUSH_ERROR,
    REMOVE_ERROR,
    SET_ERRORS
} from './types';

const errorState = [];

const errorReducer = (state = errorState, action) => {
    switch(action.type) {
        case PUSH_ERROR:
            return [
                ...state,
                action.value
            ]
        case REMOVE_ERROR:
            state.splice(action.index, 1);
            return [
                ...state
            ]
        case SET_ERRORS:
            return action.errors
        default:
            return state;
    }
}

export default errorReducer;