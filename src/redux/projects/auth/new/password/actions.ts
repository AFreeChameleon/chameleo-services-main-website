import {
    PASSWORD_SET_VALUE
} from './types';

export const passwordSetValue = (key: string, value) => {
    return {
        type: PASSWORD_SET_VALUE,
        key: key,
        value: value
    }
}