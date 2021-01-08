import {
    SET_PROJECT_ID,
    SET_PROJECT_SECRET,

    FETCH_AUTH_PROJECT_REQUEST,
    FETCH_AUTH_PROJECT_SUCCESS,
    FETCH_AUTH_PROJECT_FAILURE,
    
    POST_AUTH_START_CONTAINER_REQUEST,
    POST_AUTH_START_CONTAINER_SUCCESS,
    POST_AUTH_START_CONTAINER_FAILURE
} from './types';

const projectState = {
    project_id: '',
    project_secret: '',
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
        case SET_PROJECT_SECRET:
            return {
                ...state,
                project_secret: action.project_secret
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
        case POST_AUTH_START_CONTAINER_REQUEST:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: true
                }
            }
        case POST_AUTH_START_CONTAINER_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: '',
                    containers: action.data
                }
            }
        case POST_AUTH_START_CONTAINER_FAILURE:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: action.error
                }
            }
        default:
            return state;
    }
}

export default projectReducer;