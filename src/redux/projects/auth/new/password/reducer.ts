import {
    PASSWORD_SET_VALUE
} from './types';

const passwordState = {
    upperCase: true,
    lowerCase: true,
    requireNumbers: true,
    requireSpecialChars: true,
}

const passwordReducer = (state = passwordState, action) => {
    switch(action.type) {
        case PASSWORD_SET_VALUE:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state;
    }
}

export default passwordReducer;