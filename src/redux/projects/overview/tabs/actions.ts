import {
    SET_SELECTED_TAB
} from './types';

export const setSelectedTab = (tab: number) => {
    return {
        type: SET_SELECTED_TAB,
        tab: tab
    }
}