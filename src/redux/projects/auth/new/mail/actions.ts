import {
    MAIL_SET_VALUE
} from './types';

export const mailSetValue = (key: string, value) => {
    return {
        type: MAIL_SET_VALUE,
        key: key,
        value: value
    }
}