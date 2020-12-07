import {
    FETCH_USER_LIST_REQUEST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAILURE
} from './types';

const userState = {
    list: [],
    loading: false,
    error: ''
}

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case FETCH_USER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.users,
                error: ''
            }
        case FETCH_USER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default userReducer;