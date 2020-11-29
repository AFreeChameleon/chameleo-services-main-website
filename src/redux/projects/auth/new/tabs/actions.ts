import {
    SET_TAB
} from './types';

export const setSelectedTab = (value: number) => {
    return {
        type: SET_TAB,
        value: value
    }
}