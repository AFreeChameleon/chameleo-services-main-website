import {
    OAUTH_SET_GOOGLE_VALUE
} from './types';

const oauthState = {
    google: {
        clientID: '',
        clientSecret: '',
        redirectURI: ''
    }
}

const oauthReducer = (state = oauthState, action) => {
    switch(action.type) {
        case OAUTH_SET_GOOGLE_VALUE:
            return {
                ...state,
                google: {
                    ...state.google,
                    [action.key]: action.value
                }
            }
        default:
            return state;
    }
}

export default oauthReducer;