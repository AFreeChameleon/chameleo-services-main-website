import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
} from './types';

const statsState = {
    loading: false,
    errors: [],
    users: [],
    userCount: 0
}

const statsReducer = (state = statsState, action) => {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users,
                userCount: action.userCount,
                activeUsers: action.activeUsers
            }
        case FETCH_ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.errors,
                users: [],
                userCount: 0,
                activeUsers: []
            }
        default:
            return state;
    }
}

export default statsReducer;