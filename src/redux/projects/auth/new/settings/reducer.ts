import crypto from 'crypto';
import {
    SETTINGS_SET_VALUE,
} from './types';

const settingsState = {
    userSignUp: 0,
    appSecret: crypto.randomBytes(16).toString('hex'),
    sessionExpiresIn: {
        forever: false,
        days: 30,
        minutes: 0
    }
}

const settingsReducer = (state = settingsState, action) => {
    switch(action.type) {
        case SETTINGS_SET_VALUE:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state;
    }
}

export default settingsReducer;