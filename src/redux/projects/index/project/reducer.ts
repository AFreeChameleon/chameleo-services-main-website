import {
    PROJECT_SET_VALUE,
    PROJECT_FETCH_PROJECTS_REQUEST,
    PROJECT_FETCH_PROJECTS_SUCCESS,
    PROJECT_FETCH_PROJECTS_FAILURE
} from './types';

const projectState = {
    projects: {
        loading: false,
        list: [],
        error: ''
    },
    newProjectName: '',
    newProjectModalOpen: false,
}

const projectReducer = (state = projectState, action) => {
    switch (action.type) {
        case PROJECT_SET_VALUE:
            return {
                ...state,
                [action.key]: action.value
            }
        case PROJECT_FETCH_PROJECTS_REQUEST:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    loading: true
                }
            }
        case PROJECT_FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    list: action.list,
                    loading: false
                }
            }
        case PROJECT_FETCH_PROJECTS_FAILURE:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    error: action.message,
                    loading: false
                }
            }
        default:
            return state;
    }
}

export default projectReducer;