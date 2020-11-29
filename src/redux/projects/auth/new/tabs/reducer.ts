import {
    SET_TAB
} from './types';

const tabsState = {
    selectedTab: 0
}

const tabsReducer = (state = tabsState, action) => {
    switch(action.type) {
        case SET_TAB:
            return {
                ...state,
                selectedTab: action.value
            }
        default:
            return state;
    }
}

export default tabsReducer;