import {
    SETTINGS_SET_VALUE,
} from './types';

export const settingsSetValue = (key: string, value) => {
    return {
        type: SETTINGS_SET_VALUE,
        key: key,
        value: value
    }
}