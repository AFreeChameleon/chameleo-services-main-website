import {
    OAUTH_SET_GOOGLE_VALUE
} from './types';

export const oauthSetGoogleValue = (key: string, value) => {
    return {
        type: OAUTH_SET_GOOGLE_VALUE,
        key: key,
        value: value
    }
}