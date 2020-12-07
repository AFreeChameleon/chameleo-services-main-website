import {
    SET_PROJECT_ID,

    FETCH_AUTH_PROJECT_REQUEST,
    FETCH_AUTH_PROJECT_SUCCESS,
    FETCH_AUTH_PROJECT_FAILURE
} from './types';

const projectState = {
    project_id: '',
    auth: {
        loading: false,
        containers: [],
        error: ''
    }
}

const projectReducer = (state = projectState, action) => {
    switch (action.type) {
        case SET_PROJECT_ID:
            return {
                ...state,
                project_id: action.project_id
            }
        case FETCH_AUTH_PROJECT_REQUEST:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: true
                }
            }
        case FETCH_AUTH_PROJECT_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: '',
                    containers: action.data
                }
            }
        case FETCH_AUTH_PROJECT_FAILURE:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: action.error,
                }
            }
        default:
            return state;
    }
}

export default projectReducer;