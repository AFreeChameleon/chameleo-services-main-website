import {
    ADD_ERROR_MESSAGE,
    REMOVE_ERROR_MESSAGE,
    SET_ERROR_MESSAGES,
    SET_ERROR_OPEN
} from './types';

const defaultState: {
    messages: string[] | [],
    open: boolean
} = {
    messages: [],
    open: false
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ERROR_OPEN:
            return {
                ...state,
                open: action.value
            }
        case ADD_ERROR_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.value]
            };
        case REMOVE_ERROR_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages.filter(m => m !== action.value)
                ]
            };
        case SET_ERROR_MESSAGES:
            return {
                ...state,
                messages: [ ...action.values ]
            };
        default:
            return state;
    }
}

export default reducer;