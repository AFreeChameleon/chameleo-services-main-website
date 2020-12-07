import {
    SET_PROJECT_VALUE
} from './types';

export const setProjectValue = (key: string, value: any) => {
    return {
        type: SET_PROJECT_VALUE,
        key: key,
        value: value
    }
}