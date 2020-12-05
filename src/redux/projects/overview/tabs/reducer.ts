import {
    SET_SELECTED_TAB
} from './types';

const tabState = {
    selectedTab: 0
}

const tabReducer = (state = tabState, action) => {
    switch (action.type) {
        case SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.tab
            }
        default:
            return state;
    }
}

export default tabReducer;